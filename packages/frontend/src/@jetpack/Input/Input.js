import React from 'react';
import PropTypes from 'prop-types';

export default function Input({
  type,
  name,
  minLength,
  maxLength,
  size,
  ...restProps
}) {
  return (
    <input
      {...restProps}
      type={type}
      id={name}
      name={name}
      minLength={minLength}
      maxLength={maxLength}
      size={size}
    />
  );
}

Input.propTypes = {
  type: PropTypes.oneOf([
    'color',
    'date',
    'datetime-local',
    'email',
    'file',
    'hidden',
    'checkbox',
    'radio',
    'image',
    'month',
    'number',
    'password',
    'range',
    'search',
    'tel',
    'text',
    'time',
    'url',
    'week',
  ]).isRequired,
  name: PropTypes.string,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  size: PropTypes.number,
};

Input.defaultProps = {
  type: 'text',
};
