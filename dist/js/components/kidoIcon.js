import { __awaiter } from "tslib";
import Constants from "../utils/constants";
import hostStyles from "../css/host.css";
import modStyles from "../css/modStyles.css";
import { applyShadyCss } from "../utils/shadyCSS";
import { getIconSvg } from "../utils/cache";
var CUSTOM_TAG_NAME = Constants.TAG_NAME;
const TEMPLATE = document.createElement("template");
TEMPLATE.innerHTML = `
<style>
${hostStyles}
${modStyles}
</style>
<div id="kdIconHolder"></div>
`;
export class KidoIcon extends HTMLElement {
    static get observedAttributes() {
        return ["name", "type", "size", "color", "flipX", "flipY"];
    }
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(TEMPLATE.content.cloneNode(true));
        applyShadyCss(this);
        this.$kdIconHolder = shadowRoot.getElementById("kdIconHolder");
    }
    attributeChangedCallback(attr, oldVal, newVal) {
        if (newVal !== oldVal) {
            switch (attr) {
                case "name":
                case "type":
                    this.renderIcon();
                    break;
                case "size":
                    if (newVal && !/^(xs|sm|md|lg)$/.test(newVal)) {
                        this.$kdIconHolder.style.width = this.$kdIconHolder.style.height =
                            newVal.trim();
                    }
                    break;
                case "color":
                    this.$kdIconHolder.style.fill = newVal || "";
                    break;
                case "flipX":
                    this.$kdIconHolder.style.transform = "scaleX(-1)";
                    break;
                case "flipY":
                    this.$kdIconHolder.style.transform = "scaleY(-1)";
                    break;
            }
        }
    }
    connectedCallback() {
        applyShadyCss(this);
        this.renderIcon();
    }
    renderIcon() {
        return __awaiter(this, void 0, void 0, function* () {
            const name = this.getAttribute("name");
            const type = this.getAttribute("type");
            if (!name)
                return;
            if (Constants.TAG_REGX.test(name)) {
                const iconURL = `${Constants.BASE_URL}/${name}.svg`;
                yield this.loadSVG(iconURL, name);
            }
            else {
                const typeSet = new Set(Constants.TYPE_STRINGS);
                const data = {
                    outlined: Constants.TAG_OUTLINED_PREFIX,
                    filled: Constants.TAG_FILLED_PREFIX,
                    logo: Constants.TAG_LOGO_PREFIX,
                };
                if (type && typeSet.has(type)) {
                    const prefix = data[type];
                    const iconURL = `${Constants.BASE_URL}/${prefix}${name}.svg`;
                    yield this.loadSVG(iconURL, name);
                }
                else {
                    const iconURL = `${Constants.BASE_URL}/${Constants.TAG_OUTLINED_PREFIX}${name}.svg`;
                    yield this.loadSVG(iconURL, name);
                }
            }
        });
    }
    loadSVG(url, name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const svg = yield getIconSvg(url);
                this.$kdIconHolder.innerHTML = svg || "";
            }
            catch (error) {
                console.error(`Error in rendering icon: ${name}`);
            }
        });
    }
    static init() {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", () => {
                this.insertIcons();
                this.observeDOMChanges();
            });
        }
        else {
            this.insertIcons();
            this.observeDOMChanges();
        }
    }
    static insertIcons() {
        let elements = document.querySelectorAll(`[class^=${Constants.TAG_OUTLINED_PREFIX}],[class^=${Constants.TAG_FILLED_PREFIX}], [class^=${Constants.TAG_LOGO_PREFIX}]`);
        if (elements.length > 0) {
            elements.forEach((elem) => {
                const clsNames = Array.from(elem.classList);
                for (let i = clsNames.length - 1; i >= 0; i--) {
                    if (clsNames[i].startsWith(Constants.TAG_OUTLINED_PREFIX) ||
                        clsNames[i].startsWith(Constants.TAG_FILLED_PREFIX) ||
                        clsNames[i].startsWith(Constants.TAG_LOGO_PREFIX)) {
                        const displayElement = document.createElement(CUSTOM_TAG_NAME);
                        displayElement.setAttribute("name", clsNames[i]);
                        const sourceStyles = getComputedStyle(elem);
                        for (let j = 0; j < sourceStyles.length; j++) {
                            const proKey = sourceStyles[j];
                            const value = sourceStyles.getPropertyValue(proKey);
                            displayElement.style[proKey] = value;
                        }
                        displayElement.setAttribute("size", sourceStyles.fontSize);
                        displayElement.setAttribute("color", sourceStyles.color);
                        elem.style.display = "none";
                        elem.insertAdjacentElement("afterend", displayElement);
                        break;
                    }
                }
            });
        }
    }
    static observeDOMChanges() {
        const observer = new MutationObserver(() => {
            this.insertIcons();
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
        });
    }
    static register(tag) {
        if (tag) {
            if (!customElements.get(tag)) {
                CUSTOM_TAG_NAME = tag;
                const dynamicElement = class extends KidoIcon {
                };
                customElements.define(tag, dynamicElement);
            }
            else {
                console.warn(`Tag name ${tag} is already registered`);
            }
        }
        else {
            customElements.define(Constants.TAG_NAME, this);
        }
    }
}
KidoIcon.register();
KidoIcon.init();
window.KidoIcon = KidoIcon;
