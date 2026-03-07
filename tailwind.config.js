/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./App.{js,jsx,ts,tsx}',
		'./components/**/*.{js,jsx,ts,tsx}',
		'./app/**/*.{js,jsx,ts,tsx}',
	],
	presets: [require('nativewind/preset')],
	theme: {
		extend: {
			colors: {
				/* Colores de fondo */
				fondo: '#0E1A11',
				card: '#152618',
				border: '#1D362A',
				/* Colores de botones y textos */
				color: '#21c063',
				primario: '#FFFFFF',
				segundario: '#7faa96',
				/* Colores transparentes */
				trans: '#ffffff10',
				trans2: '#ffffff30',
			},
			borderRadius: {
				rounded: '1.8rem',
				rounded2: '2.2rem',
			},
			height: {
				boton: '4.2rem',
				boton2: '5.2rem',
			},
			width: {
				boton: '4.2rem',
			},
			fontFamily: {
				urbanist: ['Urbanist'],
			},
			fontSize: {
				// es un titulo grande
				h1: '3rem',
				// es un titulo mediano
				h2: '1.8rem',
				// es un subtitulo
				h3: '1.2rem',
				// es un texto normal
				h4: '1rem',
				// es un texto pequeño
				base: '0.8rem',
			},
		},
	},
	plugins: [],
};
