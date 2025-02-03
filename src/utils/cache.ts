var CACHE: Record<string, string> = {};

export async function getIconSvg(url: string): Promise<string> {
  if (CACHE[url]) return CACHE[url];

  try {
    const response = await fetch(url);
    if (!response.ok) {
      delete CACHE[url];
      throw new Error(`Failed to load icon: ${response.statusText}`);
    }
    const svgContent = await response.text();
    CACHE[url] = svgContent;
    return svgContent;
  } catch (error) {
    delete CACHE[url];
    console.error(`Error in fetching icon: ${error}`);
    throw error;
  }
}
