import { styled } from "..";

export const FormContainer = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	gap: '8px',

	label: {
		fontSize: '14px',
		color: '$green300-'
	},

	input: {
		width: '100%',
		height: '32px',
		display: 'inline-flex',
		justifyContent: 'center',
		border: '1px solid transparent',
		borderRadius: '4px',
		padding: '1rem',
		fontSize: '$md',
		lineHeight: '1',
		transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
	},

	'input:focus': {
		outline: 'none',
		borderColor: '$green300',
		boxShadow: '0 0 4px $green300'
	}
})