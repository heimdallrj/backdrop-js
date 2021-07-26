import styled from 'styled-components';
import { Input as InputSource } from '@jetpack/Input';

import { FormField } from 'providers/ThemeProvider/styled';

export const Input = styled(InputSource)`
  color: rgba(55, 65, 81, 1);
  line-height: 1.25;
  padding: 0.5rem 1rem;
  border-color: rgba(229, 231, 235, 1);
  border-width: 1px;
  border-radius: 0.25rem;
  width: 100%;
  appearance: none;
  display: block;

  &:read-only {
    background-color: #ddd;
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
  font-size: 0.75rem;
  line-height: 1.8rem;
`;
export const InputWrap = styled.div``;

export default function TextInput({
  name,
  label,
  value,
  autoComplete = 'off',
  type = 'text',
  masked,
  errors,
  touched,
  onChange,
  ...restProps
}) {
  return (
    <FormField>
      <LabelWrap>{label && <Label htmlFor={name}>{label}</Label>}</LabelWrap>
      <InputWrap>
        <Input
          {...restProps}
          id={name}
          name={name}
          type={masked ? 'password' : type}
          value={value}
          autoComplete={autoComplete}
          onChange={onChange}
        />
      </InputWrap>
    </FormField>
  );
}
