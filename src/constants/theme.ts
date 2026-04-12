export const THEME_CSS_VARS = {
  primary: "--primary",
  secondary: "--secondary",
  tertiary: "--tertiary",
  accent: "--accent",
  background: "--background",
  error: "--error",
  success: "--success",
  warning: "--warning",
} as const;

export type ThemeColorName = keyof typeof THEME_CSS_VARS;
export type ColorTheme = Exclude<ThemeColorName, "background" | "error" | "success">

export const THEME_COLOR_KEYS = Object.keys(
  THEME_CSS_VARS,
) as ThemeColorName[];

const THEME_COLOR_KEY_SET = new Set<ThemeColorName>(THEME_COLOR_KEYS);

export function isThemeColorKey(value: string): value is ThemeColorName {
  return THEME_COLOR_KEY_SET.has(value as ThemeColorName);
}

export function cssVar(color: ThemeColorName) {
  return `var(${THEME_CSS_VARS[color]})`;
}

export function cssRgbVar(color: ThemeColorName, alpha?: number) {
  const value = `var(${THEME_CSS_VARS[color]})`;
  return alpha === undefined ? `rgb(${value})` : `rgb(${value}, ${alpha})`;
}