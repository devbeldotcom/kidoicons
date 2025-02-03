import { KidoIcon } from "../src/components/kidoIcon";

export {};
declare global {
  interface Window {
    ShadyCSS?: {
      styleElement(element: HTMLElement): void;
      prepareTemplateElement(
        element: HTMLTemplateElement,
        elementName: string
      ): void;
    };
    KidoIcon: typeof KidoIcon;
  }
}

declare module "*.css" {
  const classes: { [key: string]: string };
  export default classes;
}
