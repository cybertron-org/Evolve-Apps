/** @type {import('tailwindcss').Config} */
module.exports = {
content: [
  "./App.tsx",
  "./src/**/*.{js,jsx,ts,tsx}",    
  "./components/**/*.{js,jsx,ts,tsx}",
],
  presets: [require("nativewind/preset")],
darkMode: 'class', 
  theme: {
    extend: {
      fontFamily: {
        // Simple font family - use 'font-outfit' in your components
        outfit: ['Outfit-VariableFont_wght', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#0C213F',
          dark: '#60A5FA',
        },
        background: {
          DEFAULT: '#FFFFFF', 
          dark: '#333337',    
        },
        surface: {
          DEFAULT: '#F5F7FA',
          dark: '#3F3F43',    
        },
        card: {
          DEFAULT: '#FFFFFF',
          dark: '#1E293B',
        },
        label: {
          DEFAULT: '#0C213F',
          dark: '#F1F5F9',
        },
        sublabel: {
          DEFAULT: '#000000',
          dark: '#FFFFFF',
        },
        border: {
          DEFAULT: '#E5E7EB',
          dark: '#334155',
        },
          'dropdown-dark': '#3F3F43',
        'dropdown-border-dark': '#3F3F43',
        'search-dark': '#2C2C2E',
        'item-border-dark': '#2C2C2E',
      },
    },
  },
  plugins: [],
};