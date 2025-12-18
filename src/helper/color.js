


export function changeRgb(rgbStr, factor = 0.85, darken = true) {
    const match = rgbStr.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (!match) return rgbStr;

    const [_, r, g, b] = match.map(Number);
    const change = (v) => Math.max(darken ? 0 : 255, Math.floor(v * factor));
    return `rgb(${change(r)}, ${change(g)}, ${change(b)})`;
}

// e.g. obj = { sticky_header_colors: { sticky_header_bg: "#0c8c6c" }, ... }

const samesMap = new Map([
    ['sticky_buynow_style_settings', 'sticky'],
    ['details_buynow_btn_colors', 'details'],
])

export function applyCssVarsFromObject(obj) {
    let cssBlock = ':root {\n';
    let hasVariables = false;

    Object.entries(obj).forEach(([groupKey, groupValue]) => {
        const prefix = samesMap.get(groupKey) || '';
        if (typeof groupValue === 'object' && groupValue !== null) {
            Object.entries(groupValue).forEach(([colorKey, colorValue]) => {
                //save main and hover color
                if (colorKey === 'theme_color') {
                    const primaryColor = colorValue;

                    // --- PRIMARY: Base and Hover ---
                    const hoverMain = changeRgb(primaryColor, 0.85);
                    cssBlock += `  --main: ${primaryColor};\n`;
                    cssBlock += `  --hover-main: ${hoverMain};\n`;

                    // --- SECONDARY: Slightly Lighter Base and Hover ---
                    const secondaryColor = changeRgb(primaryColor, 1.05, false);
                    const hoverSecondary = changeRgb(secondaryColor, 0.85);
                    cssBlock += `  --main-secondary: ${secondaryColor};\n`;
                    // cssBlock += `  --hover-secondary: ${hoverSecondary};\n`;

                    // --- TERTIARY: More Lighter Base and Hover ---
                    const tertiaryColor = changeRgb(primaryColor, 1.10, false);
                    const hoverTertiary = changeRgb(tertiaryColor, 0.85);
                    cssBlock += `  --main-tertiary: ${tertiaryColor};\n`;
                    // cssBlock += `  --hover-tertiary: ${hoverTertiary};\n`;

                    hasVariables = true;
                }
                //save colors
                if (typeof colorValue === 'string') {
                    const varName = prefix ? `--${prefix}_${colorKey}` : `--${colorKey}`;
                    cssBlock += `  ${varName}: ${colorValue};\n`;
                    hasVariables = true;
                }
            });
        }
    });

    cssBlock += '}';
    if (hasVariables) {
        // Find or create the style tag
        let styleTag = document.getElementById('dynamic-theme-vars');
        if (!styleTag) {
            styleTag = document.createElement('style');
            styleTag.id = 'dynamic-theme-vars';
            document.head.appendChild(styleTag);
        }

        // Inject the generated CSS string
        styleTag.textContent = cssBlock;
    }
}
