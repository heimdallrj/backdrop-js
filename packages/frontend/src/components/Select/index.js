import SelectSource from 'react-select';

import { FormField } from 'providers/ThemeProvider/styled';
import { LabelWrap, Label, SelectWrap } from './styled';

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
