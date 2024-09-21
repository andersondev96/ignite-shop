import { styled } from "..";

export const Container = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'flex-start',
	justifyContent: 'center',
	minHeight: '100vh',

	'@media only screen and (max-width: 600px)': {
		margin: 'auto'
	}
})