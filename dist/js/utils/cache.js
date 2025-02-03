import { __awaiter } from "tslib";
var CACHE = {};
export function getIconSvg(url) {
    return __awaiter(this, void 0, void 0, function* () {
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
