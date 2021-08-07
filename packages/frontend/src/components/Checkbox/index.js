import styled from 'styled-components';
import { Checkbox as CheckboxSource } from '@jetpack/Checkbox';

import { FormField as FormFieldSource } from 'providers/ThemeProvider/styled';

export const FormField = styled(FormFieldSource)`
  display: flex;
  align-items: center;
`;

export const LabelWrap = styled.div``;
export const Label = styled.label`
  color: rgba(55, 65, 81, 1);
  letter-spacing: 0.025em;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 0.6rem;
  line-height: 1.8rem;
  margin: auto 8px;
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
      <CheckboxSource {...restProps} name={name} />
      <LabelWrap>{label && <Label htmlFor={name}>{label}</Label>}</LabelWrap>
    </FormField>
  );
}
