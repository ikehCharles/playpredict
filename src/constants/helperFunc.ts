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