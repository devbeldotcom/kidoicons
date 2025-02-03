export function applyShadyCss(element: HTMLElement) {
  if (typeof window !== "undefined" && window.ShadyCSS?.styleElement) {
    window.ShadyCSS.styleElement(element);
  }
}
