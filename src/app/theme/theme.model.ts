
export interface Theme {
  primary: string;
  accent: string;
  mode: Mode;
}

export enum Mode {
  dark = 'dark',
  light = 'light'
}

export interface Color {
  name: string;
  hex: string;
  darkContrast: boolean;
}

export enum ColorType {
  primary = 'primary',
  accent = 'accent'
}

// theme type guard
export const isTheme = (theme: any): theme is Theme =>
  ((theme as Theme).primary !== undefined) &&
  ((theme as Theme).accent !== undefined) &&
  ((theme as Theme).mode !== undefined);
