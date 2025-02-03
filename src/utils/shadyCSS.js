export function applyShadyCss(element) {
  if (typeof window !== "undefined" && window.ShadyCSS?.styleElement) {
    window.ShadyCSS.styleElement(element);
  }
}
