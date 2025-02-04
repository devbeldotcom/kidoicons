/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

const Constants = {
    TAG_NAME: "kido-icon",
    TYPE_STRINGS: ["outlined", "filled", "logo"],
    TAG_OUTLINED_PREFIX: "kd-",
    TAG_FILLED_PREFIX: "kdf-",
    TAG_LOGO_PREFIX: "kdl-",
    TAG_REGX: /\bkd-|\bkdf-|\bkdl-/,
    BASE_URL: "https://unpkg.com/kidoicons@latest/svg",
};

function styleInject(css, ref) {
  if ( ref === undefined ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z$1 = ":host{box-sizing:border-box;display:inline-block;font-size:medium;height:16px;width:16px}:host([size=xs]){height:.8rem;width:.8rem}:host([size=sm]){height:1.55rem;width:1.55rem}:host([size=md]){height:2.25rem;width:2.25rem}:host([size=lg]){height:3rem;width:3rem}:host([size]:not([size=\"\"]):not([size=xs]):not([size=sm]):not([size=md]):not([size=lg])){height:auto;width:auto}#kdIconHolder,svg{height:100%;width:100%}#kdIconHolder{box-sizing:border-box}";
styleInject(css_248z$1);

var css_248z = "";
styleInject(css_248z);

function applyShadyCss(element) {
    var _a;
    if (typeof window !== "undefined" && ((_a = window.ShadyCSS) === null || _a === undefined ? undefined : _a.styleElement)) {
        window.ShadyCSS.styleElement(element);
    }
}

var CACHE = {};
function getIconSvg(url) {
    return __awaiter(this, undefined, undefined, function* () {
        if (CACHE[url])
            return CACHE[url];
        try {
            const response = yield fetch(url);
            if (!response.ok) {
                delete CACHE[url];
                throw new Error(`Failed to load icon: ${response.statusText}`);
            }
            const svgContent = yield response.text();
            CACHE[url] = svgContent;
            return svgContent;
        }
        catch (error) {
            delete CACHE[url];
            console.error(`Error in fetching icon: ${error}`);
            throw error;
        }
    });
}

var CUSTOM_TAG_NAME = Constants.TAG_NAME;
const TEMPLATE = document.createElement("template");
TEMPLATE.innerHTML = `
<style>
${css_248z$1}
${css_248z}
</style>
<div id="kdIconHolder"></div>
`;
class KidoIcon extends HTMLElement {
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
        return __awaiter(this, undefined, undefined, function* () {
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
        return __awaiter(this, undefined, undefined, function* () {
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

export { KidoIcon, KidoIcon as default };
//# sourceMappingURL=kidoicons.esm.js.map
