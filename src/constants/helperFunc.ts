import { cssRgbVar, isThemeColorKey, ThemeColorName } from "./theme";

export function toColor(
  color: Exclude<ThemeColorName, "background" | "error" | "success">,
  opacity: number = 1,
) {
  return cssRgbVar(color, opacity >= 1 ? undefined : opacity);
}

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

export function formatCount(value: number): string {
  if (value >= 1_000_000_000)
    return `${parseFloat((value / 1_000_000_000).toFixed(1))}b`;
  if (value >= 1_000_000)
    return `${parseFloat((value / 1_000_000).toFixed(1))}m`;
  if (value >= 1_000)
    return `${parseFloat((value / 1_000).toFixed(1))}k`;
  return value.toString();
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
