import React from 'react';
import PropTypes from 'prop-types';

import Input from '../Input';

export default function Radio({
  name,
  value,
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
        type="radio"
        name={name}
        checked={checked}
        style={inputStyle}
        value={value}
      />
      <label style={labelStyle} htmlFor={name}>
        {label}
      </label>
    </div>
  );
}

Radio.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  checked: PropTypes.bool,
  label: PropTypes.string,
  wrapperStyle: PropTypes.object,
  inputStyle: PropTypes.object,
  labelStyle: PropTypes.object,
};

Radio.defaultProps = {
  checked: false
};
