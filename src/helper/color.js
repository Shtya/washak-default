

// e.g. obj = { sticky_header_colors: { sticky_header_bg: "#0c8c6c" }, ... }

const samesMap = new Map([
    ['sticky_buynow_style_settings', 'sticky'],
    ['details_buynow_btn_colors', 'details'],
])

const replaceMap = new Map([
    ['theme_color ', 'main'],
    ['second_theme_color', 'second'],
    ['hover_theme_color', 'hover-main']
])

export function applyCssVarsFromObject(obj) {
    const root = document.documentElement;

    Object.entries(obj).forEach(([groupKey, groupValue]) => {
        const prefix = samesMap.get(groupKey) || '';
        if (typeof groupValue === 'object' && groupValue !== null) {
            Object.entries(groupValue).forEach(([colorKey, colorValue]) => {
                const replaceValue = replaceMap.get(colorKey);
                if (replaceValue) {
                    root.style.setProperty(`--${replaceValue}`, colorValue);
                    return;
                }
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
