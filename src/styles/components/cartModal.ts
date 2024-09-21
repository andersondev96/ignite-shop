import * as Dialog from '@radix-ui/react-dialog';
import { keyframes, styled } from "..";

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const overlayHide = keyframes({
  '0%': { opacity: 1 },
  '100%': { opacity: 0 },
});

const contentShow = keyframes({
  '0%': { transform: 'translateX(100%)', opacity: 0 },
  '100%': { transform: 'translateX(0)', opacity: 1 },
});

const contentHide = keyframes({
  '0%': { transform: 'translateX(0)', opacity: 1 },
  '100%': { transform: 'translateX(100%)', opacity: 0 },
});

export const Overlay = styled(Dialog.Overlay, {
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.75)',
  animation: `${overlayShow} 300ms ease-in-out forwards`,
  '&[data-state="closed"]': {
    animation: `${overlayHide} 300ms ease-in-out forwards`,
  },
});

export const Content = styled(Dialog.Content, {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '480px',
  height: '100%',
  borderRadius: '4px',
  position: 'fixed',
  right: 0,
  top: 0,
  padding: '48px 72px',
  backgroundColor: '$gray800',

  animation: `${contentShow} 300ms ease-in-out forwards`,
  
  '&[data-state="closed"]': {
    animation: `${contentHide} 300ms ease-in-out forwards`,
  },
});

export const EmptyCartMessage = styled('p', {
  marginTop: '8px',
  textAlign: 'center',
  fontSize: '$lg',
  color: '$gray300',
});

export const CloseButton = styled(Dialog.Close, {
  position: 'absolute',
  background: 'transparent',
  border: 0,
  top: '1.5rem',
  right: '1.5rem',
  lineHeight: 0,
  cursor: 'pointer',
  color: '$gray200',
});

export const ItemsContainer = styled('div', {
  marginTop: '32px',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
});

export const ProductsContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  justifyContent: 'space-between',
});

export const ItemContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '20px',

  div: {
    display: 'flex',
    flexDirection: 'column',
  },

  span: {
    fontSize: '$lg',
    color: '$gray300',
  },

  strong: {
    fontSize: '$lg',
    fontWeight: 'bold',
    color: '$gray100',
    marginTop: '2px',
  },

  a: {
    fontSize: '$md',
    fontWeight: 'bold',
    color: '$green500',
    marginTop: '8px',
  },

  button: {
    background: 'transparent',
    border: 'none',
    textAlign: 'left',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '$green300',
    marginTop: '8px',
    cursor: 'pointer',
  },
});

export const ImageContainer = styled('div', {
  width: '100%',
  maxWidth: 101.94,
  height: '93px',
  background: 'linear-gradient(100deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  },
});

export const FooterContainer = styled('section', {
  display: 'flex',
  flexDirection: 'column',

  div: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },

  span: {
    fontSize: '$md',
    color: '$gray100',
  },

  p: {
    fontSize: '$lg',
  },

  strong: {
    fontWeight: 'bold',
    fontSize: '$lg',
  },
});

export const ButtonContainer = styled('button', {
  marginTop: '57px',
  height: '69px',
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
