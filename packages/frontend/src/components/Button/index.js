import { Button as ButtonSource } from '@jetpack/Button';
import styled from 'styled-components';

export const ButtonExtended = styled(ButtonSource)`
  background-color: red;
  padding: 8px 20px;
  color: white;
  text-transform: uppercase;
  font-size: 0.8em;
  font-weight: bold;
`;

export default function Button({ children, type = 'button', ...restProps }) {
  return (
    <ButtonExtended {...restProps} type={type}>
      {children}
    </ButtonExtended>
  );
}
