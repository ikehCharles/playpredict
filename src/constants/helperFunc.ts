import { cssRgbVar, isThemeColorKey } from "./theme";

export function GetActualColor(
  colorName?: string,
  fallback: string = "default",
) {
  if (!colorName) return fallback;

  if (isThemeColorKey(colorName)) {
    return cssRgbVar(colorName);
  }

  return colorName;
}

export function GetBreakpoint(key: "sm" | "md" | "lg" | "xl" | "2xl") {
  const breakpoints: Record<typeof key, number> = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
  };

  if (typeof window === "undefined") {
    return false;
  }

  const minWidth = breakpoints[key] + 1;
  return window.matchMedia(`(min-width: ${minWidth}px)`).matches;
}
