import styled from 'styled-components';
import { Checkbox as CheckboxSource } from '@jetpack/Checkbox';

import { FormField } from 'providers/ThemeProvider/styled';

export const LabelWrap = styled.div``;
export const Label = styled.label`
  color: rgba(55, 65, 81, 1);
  letter-spacing: 0.025em;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 0.75rem;
  line-height: 1.8rem;
`;

export default function Checkbox({
  name,
  label,
  touched,
  errors,
  ...restProps
}) {
  return (
    <FormField>
      <LabelWrap>{label && <Label htmlFor={name}>{label}</Label>}</LabelWrap>
      <CheckboxSource {...restProps} name={name} />
    </FormField>
  );
}
