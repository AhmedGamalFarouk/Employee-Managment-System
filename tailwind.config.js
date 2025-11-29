/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Brand Colors - Gold Palette
                gold: {
                    50: '#FDFBF7',
                    100: '#FAF4E8',
                    200: '#F4E5C7',
                    300: '#EED9A6',
                    400: '#E8C66E',
                    500: '#D4AF37', // Primary
                    600: '#B89530',
                    700: '#9C7C28',
                    800: '#80641F',
                    900: '#644C17',
                },

                // Refined Neutrals
                gray: {
                    50: '#FAFAFA',
                    100: '#F5F5F5',
                    200: '#E5E5E5',
                    300: '#D4D4D4',
                    400: '#A3A3A3',
                    500: '#737373',
                    600: '#525252',
                    700: '#404040',
                    800: '#262626',
                    900: '#171717',
                },

                // Semantic Colors
                success: {
                    light: '#D1FAE5',
                    DEFAULT: '#10B981',
                    dark: '#059669',
                },
                error: {
                    light: '#FEE2E2',
                    DEFAULT: '#EF4444',
                    dark: '#DC2626',
                },
                warning: {
                    light: '#FEF3C7',
                    DEFAULT: '#F59E0B',
                    dark: '#D97706',
                },
                info: {
                    light: '#DBEAFE',
                    DEFAULT: '#3B82F6',
                    dark: '#2563EB',
                },
            },

            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
            },

            fontSize: {
                'xs': ['0.75rem', { lineHeight: '1.5' }],      // 12px
                'sm': ['0.875rem', { lineHeight: '1.5' }],     // 14px
                'base': ['1rem', { lineHeight: '1.5' }],       // 16px
                'lg': ['1.125rem', { lineHeight: '1.5' }],     // 18px
                'xl': ['1.25rem', { lineHeight: '1.4' }],      // 20px
                '2xl': ['1.5rem', { lineHeight: '1.3' }],      // 24px
                '3xl': ['1.875rem', { lineHeight: '1.2' }],    // 30px
                '4xl': ['2.25rem', { lineHeight: '1.2' }],     // 36px
                '5xl': ['3rem', { lineHeight: '1.1' }],        // 48px
            },

            fontWeight: {
                normal: '400',
                medium: '500',
                semibold: '600',
                bold: '700',
                extrabold: '800',
            },

            lineHeight: {
                'tight': '1.2',
                'snug': '1.4',
                'normal': '1.5',
                'relaxed': '1.6',
                'loose': '1.8',
            },

            spacing: {
                'xs': '0.25rem',   // 4px
                'sm': '0.5rem',    // 8px
                'md': '1rem',      // 16px
                'lg': '1.5rem',    // 24px
                'xl': '2rem',      // 32px
                '2xl': '3rem',     // 48px
                '3xl': '4rem',     // 64px
                '4xl': '6rem',     // 96px
            },

            boxShadow: {
                'xs': '0 1px 2px rgba(0, 0, 0, 0.04)',
                'sm': '0 1px 3px rgba(0, 0, 0, 0.08)',
                'md': '0 4px 6px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04)',
                'lg': '0 10px 15px rgba(0, 0, 0, 0.08), 0 4px 6px rgba(0, 0, 0, 0.04)',
                'xl': '0 20px 25px rgba(0, 0, 0, 0.10), 0 8px 10px rgba(0, 0, 0, 0.04)',
                '2xl': '0 25px 50px rgba(0, 0, 0, 0.15)',
                'inner': 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
                'gold': '0 4px 14px rgba(212, 175, 55, 0.25)',
                'gold-lg': '0 8px 24px rgba(212, 175, 55, 0.35)',
            },

            borderRadius: {
                'sm': '0.375rem',  // 6px
                'md': '0.5rem',    // 8px
                'lg': '0.75rem',   // 12px
                'xl': '1rem',      // 16px
                '2xl': '1.5rem',   // 24px
                '3xl': '2rem',     // 32px
            },

            animation: {
                'spin-slow': 'spin 1.5s linear infinite',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'bounce-slow': 'bounce 2s infinite',
            },

            transitionDuration: {
                '0': '0ms',
                '150': '150ms',
                '200': '200ms',
                '300': '300ms',
                '500': '500ms',
                '700': '700ms',
            },

            transitionTimingFunction: {
                'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
                'in-expo': 'cubic-bezier(0.7, 0, 0.84, 0)',
            },
        },
    },
    plugins: [],
}
