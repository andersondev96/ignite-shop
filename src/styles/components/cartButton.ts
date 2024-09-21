import { styled } from "..";

export const Button = styled('button', {
  width: '48px',
  height: '48px',
  border: 'none',
  borderRadius: '6px',
  backgroundColor: '$gray800',
  cursor: 'pointer',
  position: 'relative',

  svg: {
    color: '$gray200',
  },

  div: {
    position: 'absolute',
    top: '-8px',      
    right: '-8px',    
    width: '24px',
    height: '24px',
    backgroundColor: '$green300',
    borderRadius: '50%',   
    display: 'flex',   
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '14px',  
		fontWeight: 'bold',
    color: '$gray100',

  },
});