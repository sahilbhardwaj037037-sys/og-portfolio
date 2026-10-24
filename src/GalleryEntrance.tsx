import { scoutImage } from './featuredProjects';
export default function GalleryEntrance() {
  return <div className="collection-departure-camera" aria-hidden="true"><figure className="collection-departure"><img src={scoutImage(3)} width="1440" height="1000" alt="" loading="lazy"/><figcaption>CLIENTSCOUT AI / SYNTHETIC DEVELOPMENT SNAPSHOT<span>ONE WORKSPACE. A WIDER COLLECTION.</span></figcaption></figure></div>;
}
