import type { CSSProperties } from 'react';

export const projectThemes = {
  'smile-care': { background: '#f2efe8', surface: '#e4e0d7', ink: '#232125', secondary: '#5d5855', accent: '#8e5142', border: '#d4cec3' },
  'six-and-seven': { background: '#181a1d', surface: '#26282c', ink: '#eeeae2', secondary: '#c1bbb3', accent: '#dc8981', border: '#48464a' },
  'ember-and-oak': { background: '#30251f', surface: '#45342a', ink: '#f1e7d7', secondary: '#cfc0ae', accent: '#c49b73', border: '#76604e' },
  'clientscout-ai': { background: '#efe9de', surface: '#e2d9cc', ink: '#302b28', secondary: '#5f5852', accent: '#526468', border: '#cfc4b5' },
} as const;
export type ProjectTheme = keyof typeof projectThemes;
export function projectThemeStyle(id: ProjectTheme): CSSProperties {
  return Object.fromEntries(Object.entries(projectThemes[id]).map(([key, value]) => [`--project-${key}`, value])) as CSSProperties;
}
