/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            colors: {
                brand: {
                    DEFAULT: '#0572ec', // 1Password Blue
                    dark: '#031835',    // Deep Navy (Hero BG)
                    surface: '#ffffff',
                    text: '#1c1e21',
                    muted: '#757575',
                    border: '#d1d5db'
                },
                // Overriding primary to map to brand blue for immediate impact
                primary: {
                    50: '#eef6ff',
                    100: '#d9eaff',
                    500: '#0572ec',
                    600: '#005bbd',
                    700: '#00448f',
                },
                slate: {
                    850: '#151e2e', // Custom dark for footers
                }
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out',
                'slide-up': 'slideUp 0.5s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                }
            }
        },
    },
    plugins: [],
}
