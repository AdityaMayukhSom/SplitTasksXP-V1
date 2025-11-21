// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    // Ensure Tailwind scans all your component files for classes
    content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            // Define your color palette here (as per your instructions)
            colors: {
                primary: {
                    light: "#4F46E5", // Indigo-600 for light mode
                    dark: "#8B5CF6", // Violet-500 for dark mode
                },
                background: {
                    light: "#FFFFFF", // White
                    dark: "#030712", // Very dark gray
                },
            },
        },
    },
    plugins: [],
    // ENABLE DARK MODE based on 'class' (Zustand will handle setting this class)
    darkMode: "class",
};
