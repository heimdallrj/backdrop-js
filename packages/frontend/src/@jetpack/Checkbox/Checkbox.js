import React from 'react';
import PropTypes from 'prop-types';

import { Input } from '../Input';

export default function Checkbox({
  name,
  checked,
  label,
  wrapperStyle,
  inputStyle,
  labelStyle,
  ...restProps
}) {
  return (
    <div style={wrapperStyle}>
      <Input
        {...restProps}
        type="checkbox"
        name={name}
        checked={checked}
        style={inputStyle}
      />
      <label style={labelStyle} htmlFor={name}>
        {label}
      </label>
    </div>
  );
}

Checkbox.propTypes = {
  name: PropTypes.string,
  checked: PropTypes.bool,
  label: PropTypes.string,
  wrapperStyle: PropTypes.object,
  inputStyle: PropTypes.object,
  labelStyle: PropTypes.object,
};

Checkbox.defaultProps = {
  checked: false,
};
