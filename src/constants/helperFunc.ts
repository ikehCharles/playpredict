export function GetCSSVariables(){
    const styles = typeof window !== "undefined" ? getComputedStyle(document.documentElement)
    : null;


  const primary = styles?.getPropertyValue("--primary")
  const secondary = styles?.getPropertyValue("--secondary");
  const tertiary = styles?.getPropertyValue("--tertiary");
  const accent = styles?.getPropertyValue("--accent");

  return {
    primary,
    secondary,
    tertiary,
    accent
  }


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