import React from 'react';

import { FormFieldError } from 'providers/ThemeProvider/styled';
import { SelectExtended } from './styled';

export const CustomSelect = ({
  className,
  placeholder,
  field,
  form,
  options,
  touched,
  errors,
  isMulti = false,
}) => {
  const onChange = (option) => {
    form.setFieldValue(
      field.name,
      isMulti ? option.map((item) => item.value) : option.value
    );
  };

  const getValue = () => {
    if (options) {
      return isMulti
        ? options.filter((option) => field.value.indexOf(option.value) >= 0)
        : options.find((option) => option.value === field.value);
    } else {
      return isMulti ? [] : '';
    }
  };

  return (
    <div>
      <SelectExtended
        className={className}
        name={field.name}
        value={getValue()}
        onChange={onChange}
        placeholder={placeholder}
        options={options}
        isMulti={isMulti}
      />
      {touched && errors && <FormFieldError>{errors}</FormFieldError>}
    </div>
  );
};

export default CustomSelect;
