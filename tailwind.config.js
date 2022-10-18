/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./providers/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        colors: (color) => ({
            dark: {
                1: color.colors.slate[50],
                2: color.colors.slate[100],
                3: color.colors.slate[200],
                4: color.colors.slate[300],
                5: color.colors.slate[400],
                6: color.colors.slate[500],
                7: color.colors.slate[600],
                8: color.colors.slate[700],
                9: color.colors.slate[800],
                10: color.colors.slate[900],
            },
            light: {
                1: color.colors.gray[50],
                2: color.colors.gray[100],
                3: color.colors.gray[200],
                4: color.colors.gray[300],
                5: color.colors.gray[400],
                6: color.colors.gray[500],
                7: color.colors.gray[600],
                8: color.colors.gray[700],
                9: color.colors.gray[800],
                10: color.colors.gray[900],
            }
        }),
        fontSize: {
            sm: "0.8rem",
            base: "1rem",
            xl: "1.25rem",
            "2xl": "1.563rem",
            "3xl": "1.953rem",
            "4xl": "2.441rem",
            "5xl": "3.052rem",
        },
        extend: {
            minWidth: {
                32: "8rem"
            }
        },
    },
    darkMode: "class",
    plugins: [
        plugin(function({ addVariant }) {
            addVariant("group-clicked", ":merge(.group).clicked &");
        })
    ]
};
