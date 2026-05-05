/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				'outline-variant': '#c2c8c2',
				'on-primary-fixed': '#0b1f15',
				'on-tertiary': '#ffffff',
				'on-secondary': '#ffffff',
				'primary-fixed-dim': '#b4ccbc',
				'on-error-container': '#93000a',
				'error-container': '#ffdad6',
				'inverse-on-surface': '#f2f1ee',
				'on-secondary-container': '#76300d',
				'on-surface': '#1a1c1a',
				outline: '#737873',
				'tertiary-container': '#3d3f2d',
				'inverse-primary': '#b4ccbc',
				'on-primary-container': '#96ae9e',
				error: '#ba1a1a',
				primary: '#172c21',
				'secondary-container': '#fd9a6f',
				'on-background': '#1a1c1a',
				'surface-container-lowest': '#ffffff',
				surface: '#faf9f6',
				'tertiary-fixed': '#e4e4cc',
				background: '#faf9f6',
				'surface-container': '#efeeeb',
				'surface-bright': '#faf9f6',
				'secondary-fixed-dim': '#ffb597',
				'on-primary': '#ffffff',
				'primary-container': '#2d4236',
				'on-surface-variant': '#424844',
				'on-tertiary-container': '#a9aa94',
				'on-primary-fixed-variant': '#364b3f',
				'on-secondary-fixed-variant': '#77320e',
				'surface-container-highest': '#e3e2e0',
				'on-tertiary-fixed': '#1b1d0e',
				'on-tertiary-fixed-variant': '#474836',
				'surface-container-high': '#e9e8e5',
				'tertiary-fixed-dim': '#c8c8b0',
				'surface-container-low': '#f4f3f1',
				'surface-variant': '#e3e2e0',
				'surface-tint': '#4d6356',
				'primary-fixed': '#d0e8d7',
				'secondary-fixed': '#ffdbcd',
				'surface-dim': '#dbdad7',
				'on-error': '#ffffff',
				secondary: '#964824',
				tertiary: '#272919',
				'inverse-surface': '#2f312f',
				'on-secondary-fixed': '#360f00'
			},
			borderRadius: {
				DEFAULT: '0.25rem',
				lg: '0.5rem',
				xl: '0.75rem',
				full: '9999px'
			},
			spacing: {
				xs: '4px',
				sm: '12px',
				base: '8px',
				md: '24px',
				gutter: '16px',
				lg: '48px',
				xl: '80px',
				'margin-mobile': '20px'
			},
			fontFamily: {
				newsreader: ['Newsreader', 'serif'],
				'work-sans': ['Work Sans', 'sans-serif'],
				h1: ['Newsreader', 'serif'],
				h2: ['Newsreader', 'serif'],
				h3: ['Newsreader', 'serif'],
				'body-lg': ['Work Sans', 'sans-serif'],
				'body-md': ['Work Sans', 'sans-serif'],
				'label-caps': ['Work Sans', 'sans-serif']
			},
			fontSize: {
				h1: ['48px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '600' }],
				h2: ['32px', { lineHeight: '1.2', fontWeight: '500' }],
				h3: ['24px', { lineHeight: '1.3', fontWeight: '500' }],
				'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
				'body-md': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
				'label-caps': ['12px', { lineHeight: '1.0', letterSpacing: '0.1em', fontWeight: '600' }]
			},
			boxShadow: {
				ambient: '0px 4px 20px rgba(45, 66, 54, 0.05)'
			}
		}
	},
	plugins: []
};
