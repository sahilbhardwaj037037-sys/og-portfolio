import { assetUrl } from './assetUrl';
import React, { Component, Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { createScreenVideo } from './screenVideo';

export interface SceneHandle { depthX?: number; rect: { x: number; y: number; width: number; height: number }; }
interface Props {
  progress: React.RefObject<number>; cinematic: React.RefObject<boolean>;
  handle: React.RefObject<SceneHandle | null>; wake: React.RefObject<() => void>;
  onFrame: () => void; onReady: () => void; onFailure: (reason?: string) => void;
  reduced: boolean; interactiveMobile: boolean; entrance: React.RefObject<number>;
}
const smooth = (a: number, b: number, v: number) => THREE.MathUtils.smoothstep(v, a, b);

function prepareModel(source: THREE.Group) {
  const model = source.clone(true);
  model.updateMatrixWorld(true);
  const screen = model.getObjectByName('tfTbkkzhxqpKRgC') as THREE.Mesh;
  const logo = model.getObjectByName('xiLiwJHfkqIwaTs') as THREE.Mesh;
  if (!screen?.isMesh || !logo?.isMesh) throw new Error('Expected verified screen and logo meshes were not found.');
  const screenBox = new THREE.Box3().setFromObject(screen);
  const center = screenBox.getCenter(new THREE.Vector3());
  const normals = screen.geometry.getAttribute('normal');
  const normal = new THREE.Vector3().fromBufferAttribute(normals, 0).transformDirection(screen.matrixWorld).normalize();
  const up = new THREE.Vector3(0, 1, 0).addScaledVector(normal, -normal.y).normalize();
  const right = new THREE.Vector3().crossVectors(up, normal).normalize();
  const positions = screen.geometry.getAttribute('position');
  let left = Infinity, rightEdge = -Infinity, bottom = Infinity, top = -Infinity;
  for (let i = 0; i < positions.count; i++) {
    const v = new THREE.Vector3().fromBufferAttribute(positions, i).applyMatrix4(screen.matrixWorld).sub(center);
    left = Math.min(left, v.dot(right)); rightEdge = Math.max(rightEdge, v.dot(right));
    bottom = Math.min(bottom, v.dot(up)); top = Math.max(top, v.dot(up));
  }
  const bounds = new THREE.Box3().setFromObject(model);
  const scale = 3.2 / bounds.getSize(new THREE.Vector3()).x;
  const corners = [[left, top], [rightEdge, top], [rightEdge, bottom], [left, bottom]].map(([x,y]) => right.clone().multiplyScalar(x).addScaledVector(up, y).multiplyScalar(scale));

  // Identified directly from its projected geometry in qa/mesh-38-diagnostic.png.
  // Hide the actual mark, then cover its recess with a plain, opaque metal insert.
  const logoCenter = new THREE.Box3().setFromObject(logo).getCenter(new THREE.Vector3());
  logo.visible = false; logo.castShadow = false; logo.receiveShadow = false;
  const lidMaterial = (model.getObjectByName('KjpcUkkMjGYeXkV') as THREE.Mesh).material as THREE.MeshStandardMaterial;
  const coverMaterial = new THREE.MeshStandardMaterial({ color: lidMaterial.color.clone(), metalness: 1, roughness: .5 });
  const cover = new THREE.Mesh(new THREE.PlaneGeometry(.055, .061), coverMaterial);
  cover.name = 'Unbranded rear lid insert';
  cover.position.copy(logoCenter).addScaledVector(normal, -.00025);
  cover.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1), normal.clone().negate());
  model.add(cover);
  const rig = new THREE.Group();
  model.scale.setScalar(scale); model.position.copy(center).multiplyScalar(-scale);
  rig.add(model);
  return { model, rig, screen, normal, corners, screenWidth: (rightEdge-left)*scale, aspect: (rightEdge-left)/(top-bottom), base: new THREE.Quaternion().setFromUnitVectors(normal, new THREE.Vector3(0,0,1)), cover };
}

function Studio(props: Props) {
  const { camera, gl, size, invalidate, scene } = useThree();
  const gltf = useLoader(GLTFLoader, assetUrl('/media/laptop-original.glb'));
  const asset = useMemo(() => prepareModel(gltf.scene), [gltf]);
  const pointer = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const visible = useRef(true);
  const frames=useRef(0);
  const drawStats=useRef({count:0,totalMs:0,maxMs:0});
  const keyLight=useRef<THREE.DirectionalLight>(null);
  const lastDraw = useRef(-1);
  const published = useRef(false);
  const imageReady = useRef(false);
  const screenshot = useMemo(() => new Image(), []);
  const video = useRef<ReturnType<typeof createScreenVideo> | null>(null);
  const videoUniforms = useMemo(() => ({ videoMap: { value: null as THREE.Texture | null }, videoMix: { value: 0 } }), []);
  const videoFade = useRef(0);
  const gpu = useMemo(() => { const ctx = gl.getContext(); const extension = ctx.getExtension('WEBGL_debug_renderer_info'); return extension ? ctx.getParameter(extension.UNMASKED_RENDERER_WEBGL) : ctx.getParameter(ctx.RENDERER); }, [gl]);
  const texture = useMemo(() => {
    const query=new URLSearchParams(location.search);
    const requested=Number(query.get('texture'));
    const density= requested===1536||requested===2048 ? requested : size.width<900?1536:2048;
    const canvas = document.createElement('canvas'); canvas.width = density; canvas.height = Math.round(density / asset.aspect);
    const map = new THREE.CanvasTexture(canvas); map.colorSpace = THREE.SRGBColorSpace; map.flipY = false;
    const anisotropy=Number(query.get('anisotropy')||8);map.anisotropy=Math.min(anisotropy,gl.capabilities.getMaxAnisotropy());
    if(query.get('filter')==='linear'){map.generateMipmaps=false;map.minFilter=THREE.LinearFilter;}
    return map;
  }, [asset]);

  useLayoutEffect(() => {
    const material = new THREE.MeshBasicMaterial({ map: texture, toneMapped: false, side: THREE.DoubleSide });
    video.current = createScreenVideo(gl.domElement, invalidate, () => { lastDraw.current = -1; });
    videoUniforms.videoMap.value = texture;
    // Both images share the original mesh UVs. Blend in linear light, then let
    // Three apply output sRGB once. Video needs Three's inline sRGB decode.
    material.onBeforeCompile = shader => {
      Object.assign(shader.uniforms, videoUniforms);
      shader.fragmentShader = 'uniform sampler2D videoMap; uniform float videoMix;\n' + shader.fragmentShader;
      shader.fragmentShader = shader.fragmentShader.replace('#include <map_fragment>', `
        vec4 stillColor = texture2D(map, vMapUv);
        vec4 movieColor = sRGBTransferEOTF(texture2D(videoMap, vMapUv));
        diffuseColor *= mix(stillColor, movieColor, videoMix);
      `);
    };
    asset.screen.material = material;
    const room = new RoomEnvironment();
    const pmrem = new THREE.PMREMGenerator(gl);
    const env = pmrem.fromScene(room, .04);
    scene.environment = env.texture;
    scene.environmentIntensity = .44;
    room.dispose(); pmrem.dispose();
    props.wake.current = invalidate;
    let mounted=true;
    document.fonts.ready.then(()=>{if(mounted){lastDraw.current=-1;invalidate();}});
    screenshot.onload = () => { imageReady.current = true; lastDraw.current = -1; invalidate(); };
    screenshot.onerror = () => props.onFailure('screen-image');
    screenshot.src = assetUrl('/media/smile-desktop.png');
    const onContextLost = (event: Event) => { event.preventDefault(); props.onFailure('context-lost'); };
    gl.domElement.addEventListener('webglcontextlost', onContextLost);
    const onVisibility = () => { visible.current = !document.hidden; if (visible.current) invalidate(); };
    const onPointer = (event: PointerEvent) => {
      if(window.scrollY > window.innerHeight * 3.3) return;
      const rect = gl.domElement.getBoundingClientRect();
      pointer.current.tx = (event.clientX - rect.left) / rect.width * 2 - 1;
      pointer.current.ty = (event.clientY - rect.top) / rect.height * 2 - 1;
      invalidate();
    };
    const leave = () => { pointer.current.tx = pointer.current.ty = 0; invalidate(); };
    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('blur', leave); document.documentElement.addEventListener('pointerleave', leave);
    document.addEventListener('visibilitychange', onVisibility);
    // Back-lid diagnostics are explicit QA modes, not navigable presentation states.
    return () => {
      mounted=false;
      props.wake.current = () => {};
      gl.domElement.removeEventListener('webglcontextlost', onContextLost);
      window.removeEventListener('pointermove', onPointer); window.removeEventListener('blur', leave);
      document.documentElement.removeEventListener('pointerleave', leave); document.removeEventListener('visibilitychange', onVisibility);
      screenshot.onload = screenshot.onerror = null;
      video.current?.dispose(); video.current = null;
      scene.environment = null; env.dispose(); material.dispose(); texture.dispose();
      asset.cover.geometry.dispose(); (asset.cover.material as THREE.Material).dispose();
    };
  }, [asset, gl, scene, texture]);
  useEffect(() => { lastDraw.current=-1; video.current?.update(props.progress.current, props.reduced); invalidate(); }, [props.reduced, props.interactiveMobile, size]);

  function drawScreen(p: number) {
    const started=performance.now();
    const canvas=texture.image as HTMLCanvasElement,ctx=canvas.getContext('2d')!;
    const w=1536,h=canvas.height/canvas.width*w,ratio=canvas.width/w;
    ctx.setTransform(ratio,0,0,ratio,0,0);ctx.globalAlpha=1;
    ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';
    ctx.fillStyle='#0b0d10';ctx.fillRect(0,0,w,h);
    const movie=video.current?.state.ready && !video.current.state.failed && !props.reduced && p>=.08;
    const identity=movie?0:1-smooth(.15,.27,p),project=(movie?1:smooth(.15,.25,p))*(1-smooth(.31,.44,p));
    ctx.save();ctx.globalAlpha=identity;
    ctx.fillStyle='#afc5d4';ctx.font='500 42px "Inter Variable", sans-serif';ctx.fillText('SB /',88,118);
    ctx.fillStyle='#f2efe8';ctx.font='500 146px "Space Grotesk Variable", sans-serif';
    ctx.fillText('SAHIL',80,363);ctx.fillText('BHARDWAJ.',80,527);
    ctx.fillStyle='#afc5d4';ctx.font='500 50px "Space Grotesk Variable", sans-serif';ctx.fillText('WEB DEVELOPER',88,640);
    ctx.strokeStyle='#354451';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(88,h-190);ctx.lineTo(w-88,h-190);ctx.stroke();
    ctx.fillStyle='#b9c1ca';ctx.font='400 40px "Inter Variable", sans-serif';ctx.fillText('SELECTED WORK / 01',88,h-100);
    ctx.fillStyle='#afc5d4';ctx.fillRect(w-150,84,60,60);ctx.restore();
    ctx.save();ctx.globalAlpha=project;ctx.fillStyle='#f2efe8';ctx.font='500 76px "Space Grotesk Variable", sans-serif';ctx.fillText('SMILE CARE CLINIC',80,144);
    ctx.fillStyle='#afc5d4';ctx.font='34px "Inter Variable", sans-serif';ctx.fillText('WORDPRESS / PHP / GUTENBERG',84,h-54);ctx.restore();
    const picture=movie?1:smooth(.2,.3,p),expand=smooth(.28,.52,p);
    if(imageReady.current&&picture>0){
      const iw=THREE.MathUtils.lerp(w-160,w,expand),ih=iw*757/1440;
      const center=THREE.MathUtils.lerp(h*.54,h*.5,expand);
      ctx.globalAlpha=picture;ctx.drawImage(screenshot,(w-iw)/2,center-ih/2,iw,ih);ctx.globalAlpha=1;
    }
    texture.needsUpdate=true;
    const ms=performance.now()-started;drawStats.current.count++;drawStats.current.totalMs+=ms;drawStats.current.maxMs=Math.max(drawStats.current.maxMs,ms);
  }

  useFrame((_, dt) => {
    video.current?.update(props.progress.current, props.reduced);
    if(!visible.current)return;
    const p=props.progress.current;frames.current++;
    const movie=video.current;
    const enabled=!!movie?.state.ready && !movie.state.failed && !props.reduced;
    const targetFade=enabled?1:0;
    if(props.reduced)videoFade.current=0;
    videoFade.current+=Math.sign(targetFade-videoFade.current)*Math.min(Math.abs(targetFade-videoFade.current),Math.min(dt,.05)/.35);
    videoUniforms.videoMap.value=movie?.state.ready?movie.texture:texture;
    videoUniforms.videoMix.value=videoFade.current*(1-smooth(.08,.3,p));
    window.__og={...window.__og,videoBlend:videoUniforms.videoMix.value};
    if(videoFade.current!==targetFade)invalidate();
    const mobile=size.width<900 || size.height<620;
    const active=props.cinematic.current;
    // Publish readiness even when an initial fragment starts below the studio.
    if(published.current && ((active && p>=1 && scrollY>innerHeight*3.3) || (!active && scrollY>size.height)))return;
    const target=new URLSearchParams(location.search).get('diagnostic');
    const poster=new URLSearchParams(location.search).has('poster');
    const compare=new URLSearchParams(location.search).get('compare')==='phase2';
    const front=smooth(.18,.68,p);
    const shift=smooth(.12,.68,p);
    const influence=active ? (1-smooth(.16,.43,p)) : 1;
    const canPointer=!props.reduced && (!mobile || props.interactiveMobile) && !poster && !target;
    const px=canPointer?pointer.current.tx:0, py=canPointer?pointer.current.ty:0;
    pointer.current.x=canPointer?THREE.MathUtils.damp(pointer.current.x,px,10,Math.min(dt,.05)):0;
    pointer.current.y=canPointer?THREE.MathUtils.damp(pointer.current.y,py,10,Math.min(dt,.05)):0;
    const rx=(active?-.09*(1-front):-.06)+pointer.current.y*.022*influence;
    const ry=(active?-.28*(1-front):-.20)+pointer.current.x*.035*influence;
    const rz=active?-.035*(1-front):-.025;
    const rotation=new THREE.Quaternion().setFromEuler(new THREE.Euler(rx,ry,rz));
    if(target==='rear')rotation.setFromEuler(new THREE.Euler(0,Math.PI,0));
    if(target==='front' || poster)rotation.identity();
    asset.rig.quaternion.copy(rotation).multiply(asset.base);
    const initialW=mobile?size.width*.71:Math.min(size.width*.40,740);
    const opening=!mobile&&!compare?1-smooth(.05,.68,active?p:0):0;
    const finalW=Math.min(size.width*.84,1120);
    const wanted=poster?size.width*.56:THREE.MathUtils.lerp(initialW,finalW,active?shift:0)*(1-opening*.10);
    const cam=camera as THREE.PerspectiveCamera;
    cam.fov=34;
    const distance=asset.screenWidth*size.height/(2*Math.tan(THREE.MathUtils.degToRad(cam.fov/2))*wanted);
    cam.position.set(0,0,distance);cam.lookAt(0,0,0);cam.updateProjectionMatrix();
    const worldPerPixel=2*distance*Math.tan(THREE.MathUtils.degToRad(cam.fov/2))/size.height;
    const cx=poster||target? .5 : mobile?.54:THREE.MathUtils.lerp(.66,.5,active?shift:0)-opening*.14;
    const cy=poster||target? .39 : mobile?.65:THREE.MathUtils.lerp(.44,.57,active?shift:0)+opening*.035;
    asset.rig.position.set((cx-.5)*size.width*worldPerPixel,(.5-cy)*size.height*worldPerPixel,0);
    asset.rig.position.y-= (1-props.entrance.current)*.075*(1-smooth(0,.08,p));
    if(keyLight.current)keyLight.current.position.x=4+pointer.current.x*.35*influence;
    asset.rig.updateMatrixWorld(true);cam.updateMatrixWorld(true);
    const projected=asset.corners.map(v=>v.clone().applyMatrix4(asset.rig.matrixWorld).project(cam));
    const xs=projected.map(v=>(v.x+1)*size.width/2),ys=projected.map(v=>(1-v.y)*size.height/2);
    props.handle.current={depthX:pointer.current.x*8*influence,rect:{x:Math.min(...xs),y:Math.min(...ys),width:Math.max(...xs)-Math.min(...xs),height:Math.max(...ys)-Math.min(...ys)}};
    const draw=Math.round(Math.min(p,.6)*100);
    if(draw!==lastDraw.current){ drawScreen(draw/100);lastDraw.current=draw; }
    if(!published.current && imageReady.current){published.current=true;window.__og={...window.__og,sceneReadyAtMs:performance.now()};props.onReady();}
    props.onFrame();
    window.__og={...window.__og,modelReady:published.current,logoHidden:!asset.model.getObjectByName('xiLiwJHfkqIwaTs')!.visible,drawCalls:gl.info.render.calls,triangles:gl.info.render.triangles,geometries:gl.info.memory.geometries,textures:gl.info.memory.textures,rotation:[rx,ry,rz],renderer:gpu,renderedFrames:frames.current,display:{width:texture.image.width,height:texture.image.height,aspect:asset.aspect,anisotropy:texture.anisotropy,mipmaps:texture.generateMipmaps,mode:p<.15?'identity':p<.52?'project':'screenshot',drawStats:{...drawStats.current}}};
    if(canPointer && influence>0 && (Math.abs(pointer.current.x-px)>.0004 || Math.abs(pointer.current.y-py)>.0004))invalidate();
  });
  return <><primitive object={asset.rig} /><ambientLight intensity={.08} /><directionalLight ref={keyLight} color="#f4f4ed" position={[4,6,3]} intensity={2.8} /><directionalLight color="#bed9ff" position={[-5,1,-1]} intensity={2.6} /><directionalLight color="#e2d5bc" position={[0,-3,-5]} intensity={.8} /></>;
}

class SceneBoundary extends Component<{children:React.ReactNode;onFailure:(reason?:string)=>void},{failed:boolean}> {
  state={failed:false};
  static getDerivedStateFromError(){return {failed:true};}
  componentDidCatch(error:Error){this.props.onFailure(error.message);}
  render(){return this.state.failed?null:this.props.children;}
}

export default function Laptop(props:Props){
  const [supported] = useState(() => {
    try {
      const probe=document.createElement('canvas');
      const context=probe.getContext('webgl2');
      if(!context)return false;
      context.getExtension('WEBGL_lose_context')?.loseContext();
      return true;
    } catch { return false; }
  });
  useEffect(()=>{if(!supported)props.onFailure('webgl-unavailable');},[supported]);
  if(!supported)return null;
  return <SceneBoundary onFailure={props.onFailure}><Canvas frameloop="demand" dpr={matchMedia('(max-width: 899px), (max-height: 619px)').matches ? 1 : Math.min(devicePixelRatio,1.5)} camera={{near:.01,far:100,fov:34}} gl={{alpha:true,antialias:true,preserveDrawingBuffer:new URLSearchParams(location.search).has('poster'),powerPreference:'high-performance'}} fallback={<span>3D unavailable. The project remains available below.</span>} onCreated={({gl})=>{gl.toneMapping=THREE.ACESFilmicToneMapping;gl.toneMappingExposure=1.1;gl.setClearColor(0x000000,0);}}><Suspense fallback={null}><Studio {...props}/></Suspense></Canvas></SceneBoundary>;
}
