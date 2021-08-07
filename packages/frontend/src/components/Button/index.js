import { Button as ButtonSource } from '@jetpack/Button';
import styled from 'styled-components';

import Preloader from 'components/Preloader';

export const ButtonExtended = styled(ButtonSource)`
  background-color: red;
  padding: 8px 20px;
  color: white;
  text-transform: uppercase;
  font-size: 0.7em;
  font-weight: bold;
  display: flex;
  align-items: center;
`;

export default function Button({
  children,
  type = 'button',
  disabled,
  ...restProps
}) {
  return (
    <ButtonExtended {...restProps} type={type} disabled={disabled}>
      {disabled && <Preloader style={{ width: '20px', margin: '0 8px 0 0' }} />}{' '}
      {children}
    </ButtonExtended>
  );
}
