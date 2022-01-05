import {createReducer, on} from '@ngrx/store';
import { changeTheme } from './theme.action';
import tinycolor from 'tinycolor2';
import {Color, ColorType, Mode, Theme} from './theme.model';
import {Storage} from '@capacitor/storage';

export const initialState = {
  primary: 'purple',
  accent: '#ffc107',
  mode: Mode.dark
};

export const themeReducer = createReducer(
  initialState,
  on(changeTheme, (state: Theme, { primary, accent, mode }) => {
    let theme;
    if (primary) {
      saveColor(primary, ColorType.primary);
      theme = {...state, primary};
    }
    if (accent) {
      saveColor(accent, ColorType.accent);
      theme = {...state, accent};
    }
    if (mode) {
      if (mode === Mode.light) {
        document.documentElement.classList.remove('dark-theme');
        document.documentElement.classList.add('light-theme');
      } else {
        document.documentElement.classList.remove('light-theme');
        document.documentElement.classList.add('dark-theme');
      }
      theme = {...state, mode};
    }
    Storage.set({
      key: 'themeObject',
      value: JSON.stringify(theme)}).then();
    return theme;
  })
);

const updateTheme = (colors: Color[], theme: string) => {
  colors.forEach(color => {
    document.documentElement.style.setProperty(
      `--theme-${theme}-${color.name}`,
      color.hex
    );
    document.documentElement.style.setProperty(
      `--theme-${theme}-contrast-${color.name}`,
      color.darkContrast ? 'rgba(black, 0.87)' : 'white'
    );
  });
};

const saveColor = (color: string, colorType: ColorType) => {
  const colorPalette = computeColors(color);
  updateTheme(colorPalette, colorType);
};

const computeColors = (hex: string): Color[] => [
  getColorObject(tinycolor(hex).lighten(52), '50'),
  getColorObject(tinycolor(hex).lighten(37), '100'),
  getColorObject(tinycolor(hex).lighten(26), '200'),
  getColorObject(tinycolor(hex).lighten(12), '300'),
  getColorObject(tinycolor(hex).lighten(6), '400'),
  getColorObject(tinycolor(hex), '500'),
  getColorObject(tinycolor(hex).darken(6), '600'),
  getColorObject(tinycolor(hex).darken(12), '700'),
  getColorObject(tinycolor(hex).darken(18), '800'),
  getColorObject(tinycolor(hex).darken(24), '900'),
  getColorObject(tinycolor(hex).lighten(50).saturate(30), 'A100'),
  getColorObject(tinycolor(hex).lighten(30).saturate(30), 'A200'),
  getColorObject(tinycolor(hex).lighten(10).saturate(15), 'A400'),
  getColorObject(tinycolor(hex).lighten(5).saturate(5), 'A700')
];

const getColorObject = (value, name): Color => {
  const c = tinycolor(value);
  return {
    name,
    hex: c.toHexString(),
    darkContrast: c.isLight()
  };
};
