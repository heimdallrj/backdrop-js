import styled from 'styled-components';
import { Input as InputSource } from '@jetpack/Input';

export const Input = styled(InputSource)`
  color: rgba(55, 65, 81, 1);
  line-height: 1.25;
  padding: 0.5rem 0.7rem;
  border-color: rgba(229, 231, 235, 1);
  border-width: 1px;
  border-radius: 0.25rem;
  width: 100%;
  appearance: none;
  display: block;
  font-size: 13px;

  &:read-only {
    background-color: hsl(0, 0%, 95%);
    color: hsl(0, 0%, 60%);
    border: none;
    outline: none;
  }
`;

export const LabelWrap = styled.div``;

export const Label = styled.label`
  color: rgba(55, 65, 81, 1);
  letter-spacing: 0.025em;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 0.7rem;
  line-height: 1.8rem;
`;

export const InputWrap = styled.div``;
