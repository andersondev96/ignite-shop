import { styled } from "..";

export const SearchInputContainer = styled('div', {
	display: 'flex',
	alignItems: 'center',
	gap: '1rem',
	background: '$gray800',
	borderRadius: '6px',
	padding: '4px',

	input: {
		background: 'transparent',
		boxShadow: 'none',
		outline: 'none',
		border: '0',
		
		fontSize: '$md',
		color: '$gray100'
	}
})