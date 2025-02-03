export declare class KidoIcon extends HTMLElement {
    static get observedAttributes(): string[];
    private $kdIconHolder;
    constructor();
    attributeChangedCallback(attr: string, oldVal: string, newVal: string): void;
    connectedCallback(): void;
    private renderIcon;
    private loadSVG;
    static init(): void;
    static insertIcons(): void;
    static observeDOMChanges(): void;
    static register(tag?: string): void;
}
