import { styled } from "..";

export const CompleteRegistrationContainer = styled('div', {
	margin: '10px 0 20px',

	span: {
		fontSize: '$md',
	}
})

export const Form = styled('form', {
	margin: '20px 0 0',
	
	display: 'flex',
	flexDirection: 'column',
	gap: '1rem',

	div: {
		display: 'flex',
		width: '100%',
		gap: '0.25rem',
	}
})

export const ButtonContainer = styled('button', {
	marginTop: '24px',
  height: '60px',
  borderRadius: '8px',
  border: 'transparent',
  background: '$green500',
  fontSize: '$lg',
  fontWeight: 'bold',
  color: '$white',
  cursor: 'pointer',

  '&:disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },

  '&:not(:disabled):hover': {
    backgroundColor: '$green300',
  },
});