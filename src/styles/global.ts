import { globalCss } from ".";

export const globalStyles = globalCss({
	'*': {
		margin: 0,
		padding: 0,
		boxSizing: 'border-box',
	},

	body: {
		backgroundColor: '$gray900',
		color: '$gray100',
		'-webkit-font-smoothing': 'antialiased',	
	},

	'body input textarea, button': {
		fontFamily: 'Roboto',
		fontWeight: 400,
	},

	'textarea:focus, input:focus, select:focus, button': {
		boxShadow: '0 0 0 0',
		border: '0 none',
		outline: '0'
	}
})