export function applyShadyCss(element) {
    var _a;
    if (typeof window !== "undefined" && ((_a = window.ShadyCSS) === null || _a === void 0 ? void 0 : _a.styleElement)) {
        window.ShadyCSS.styleElement(element);
    }
}
