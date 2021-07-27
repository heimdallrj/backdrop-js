import styled from 'styled-components';
import { Textarea as TextareaSource } from '@jetpack/Textarea';

import { FormField } from 'providers/ThemeProvider/styled';

export const TextareaExtended = styled(TextareaSource)`
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

export default function Textarea({ label, name }) {
  return (
    <FormField>
      <LabelWrap>{label && <Label htmlFor={name}>{label}</Label>}</LabelWrap>
      <TextareaExtended />
    </FormField>
  );
}
