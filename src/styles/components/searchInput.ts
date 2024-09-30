import { styled } from "..";

export const SearchInputContainer = styled('div', {
	display: 'flex',
	alignItems: 'center',
	gap: '1rem',
	background: '$gray800',
	borderRadius: '6px',
	padding: '0.5rem 1rem',

	input: {
		width: '100%',
		background: 'transparent',
		boxShadow: 'none',
		outline: 'none',
		border: '0',
		
		fontSize: '$md',
		color: '$gray100'
	}
})