import { FormField } from 'providers/ThemeProvider/styled';
import { Input, LabelWrap, Label, InputWrap } from './styled';

import { FormFieldError } from 'providers/ThemeProvider/styled';

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
      {touched && errors && <FormFieldError>{errors}</FormFieldError>}
    </FormField>
  );
}
