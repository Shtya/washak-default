


export function darkenRgb(rgbStr, factor = 0.85) {
    const match = rgbStr.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (!match) return rgbStr;

    const [_, r, g, b] = match.map(Number);
    const darken = (v) => Math.max(0, Math.floor(v * factor));
    return `rgb(${darken(r)}, ${darken(g)}, ${darken(b)})`;
}

// e.g. obj = { sticky_header_colors: { sticky_header_bg: "#0c8c6c" }, ... }

const samesMap = new Map([
    ['sticky_buynow_style_settings', 'sticky'],
    ['details_buynow_btn_colors', 'details'],
])

export function applyCssVarsFromObject(obj) {
    const root = document.documentElement;

    Object.entries(obj).forEach(([groupKey, groupValue]) => {
        const prefix = samesMap.get(groupKey) || '';
        if (typeof groupValue === 'object' && groupValue !== null) {
            Object.entries(groupValue).forEach(([colorKey, colorValue]) => {
                //save main and hover color
                if (colorKey === 'theme_color') {
                    const darker = darkenRgb(colorValue);
                    root.style.setProperty(`--main`, colorValue);
                    root.style.setProperty(`--hover-main`, darker);
                }
                //save colors
                if (typeof colorValue === 'string') {
                    if (prefix)
                        root.style.setProperty(`--${prefix}_${colorKey}`, colorValue);
                    else
                        root.style.setProperty(`--${colorKey}`, colorValue);
                }
            });
        }
    });
}
