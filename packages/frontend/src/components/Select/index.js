import SelectSource from 'react-select';
import styled from 'styled-components';

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
export const SelectWrap = styled.div``;

export default function Select({
  label,
  name,
  options,
  value,
  onChange,
  ...restProps
}) {
  return (
    <FormField>
      <LabelWrap>{label && <Label htmlFor={name}>{label}</Label>}</LabelWrap>
      <SelectWrap>
        <SelectSource
          {...restProps}
          options={options}
          name={name}
          value={value}
          onChange={onChange}
        />
      </SelectWrap>
    </FormField>
  );
}
