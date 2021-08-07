import { FormField, FormFieldError } from 'providers/ThemeProvider/styled';
import { LabelWrap, Label, SelectWrap, SelectExtended } from './styled';

export default function Select({
  label,
  name,
  options,
  value,
  touched,
  errors,
  onChange,
  ...restProps
}) {
  return (
    <FormField>
      <LabelWrap>{label && <Label htmlFor={name}>{label}</Label>}</LabelWrap>
      <SelectWrap>
        <SelectExtended
          {...restProps}
          options={options}
          name={name}
          value={value}
          onChange={onChange}
        />
      </SelectWrap>
      {touched && errors && <FormFieldError>{errors}</FormFieldError>}
    </FormField>
  );
}
