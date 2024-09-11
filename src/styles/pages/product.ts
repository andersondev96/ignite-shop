import { styled } from "..";

export const ProductContainer = styled('main', {
	display: 'grid',
	gridTemplateColumns: '1fr 1fr',
	alignItems: 'stretch',
	gap: '4rem',

	maxWidth: 1180,
	margin: '0 auto',

	'@media only screen and (max-width: 600px)': {
		gridTemplateColumns: '1fr',
		alignItems: 'center',
		padding: '1.5rem'
	}
})

export const ImageContainer = styled('div', {
	width: '100%',
	maxWidth: 576,
	height: '656px',
	background: 'linear-gradient(100deg, #1ea483 0%, #7465d4 100%)',
	borderRadius: 8,
	padding: '0.25rem',

	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',

	img: {
		objectFit: 'cover'
	},

	'@media only screen and (max-width: 600px)': {
		width: '100%',
		maxWidth: 480,
		height: '520px',
	}

})

export const ProductDetails = styled('div', {
	display: 'flex',
	flexDirection: 'column',

	h1: {
		fontSize: '$2xl',
		color: '$gray300',

		'@media only screen and (max-width: 600px)': {
			fontSize: '$xl'
		}
	},

	span: {
		marginTop: '1rem',
		display: 'block',
		fontSize: '$2xl',
		color: '$green300',

		'@media only screen and (max-width: 600px)': {
			fontSize: '$xl'
		}


	},

	p: {
		marginTop: '2.5rem',
		fontSize: '$md',
		lineHeight: 1.6,
		color: '$gray300',

		'@media only screen and (max-width: 600px)': {
			marginTop: '1rem',
			fontSize: '$md'
		}
	},

	button: {
		marginTop: 'auto',
		backgroundColor: '$green500',
		border: 0,
		color: '$white',
		borderRadius: 8,
		padding: '1.25rem',
		cursor: 'pointer',
		fontWeight: 'bold',
		fontSize: '$md',

		'&:disabled': {
			opacity: 0.6,
			cursor: 'not-allowed',
		},

		'&:not(:disabled):hover': {
			backgroundColor: '$green300',
		},

		'@media only screen and (max-width: 600px)': {
			marginTop: '2rem'
		}

	},

})