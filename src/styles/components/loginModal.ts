import * as Dialog from '@radix-ui/react-dialog';
import { styled } from "..";

export const Overlay = styled(Dialog.Overlay, {
	position: 'fixed',
	inset: 0,
	backgroundColor: 'rgba(0, 0, 0, 0.75)',
	animation: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)'
})

export const Close = styled(Dialog.Close, {
	position: 'absolute',
  background: 'transparent',
  border: 0,
  top: '1.5rem',
  right: '1.5rem',
  lineHeight: 0,
  cursor: 'pointer',
  color: '$gray200',
})

export const Content = styled(Dialog.Content, {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	position: 'fixed',
	borderRadius: '4px',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '90vw',
	maxWidth: '450px',
	height: '80vh',
	maxHeight: '150vh',
	padding: '25px',
	backgroundColor: '$gray800',
	animation: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',

	'&:focus': {
		outline: 'none'
	}
})

export const Title = styled(Dialog.Title, {
	margin: 0,
	fontWeight: 'bold',
	fontSize: '$2xl'
})

export const Description = styled(Dialog.Description, {
	margin: '10px 0 20px',
	fontSize: '$lg',

	a: {
		textDecoration: 'underline',
		cursor: 'pointer',
		animation: 'opacity 0.2s',

		'&:hover': {
			opacity: '0.9'
		}
	}
})

export const Form = styled('form', {
	display: 'flex',
	flexDirection: 'column',
	div: {
		display: 'flex',
		gap: '16px',
		flexDirection: 'column',
	},

	'.divider': {
		marginTop: '1.25rem',
		borderTop: '1px solid $gray100'
	},

	p: {
		fontWeight: 'lighter',
		textAlign: 'center'
	}
})

export const ButtonBase = styled('button', {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	gap: '0.5rem',
	padding: '0.35rem',
	margin: '10px 0 10px',
	borderRadius: '0.25rem',
	cursor: 'pointer',
	transition: 'background-color 0.2s',
	fontWeight: 'bolder',

	'&:hover': {
		filter: 'brightness(0.9)',
	},
})

export const GoogleAuthentication = styled(ButtonBase, {
	background: '$gray100',
	color: '$gray800',

})

export const SignInButton = styled(ButtonBase, {
	height: '48px',
	backgroundColor: '$green300',
	color: '$gray100',
	fontSize: '$md',

	'&:hover': {
		background: '$green500'
	}
})