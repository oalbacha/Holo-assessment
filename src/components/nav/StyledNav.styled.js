import styled from 'styled-components'

export const StyledNav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  position: absolute;
  margin-top: ${p=>p.inputValue.length < 4 ? 0 : '36px' };
  margin-left: ${p=>p.inputValue.length < 4 ? 0 : '85px' };
  top: ${p=>p.inputValue.length < 4 ? '40%' : '0'};
  left: ${p=>p.inputValue.length < 4 ? '25%' : '0'};
`