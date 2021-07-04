import React from 'react';
import PropTypes from 'prop-types';

export default function Select({ name, options }) {
  return (
    <select name={name} id={name}>
      {options.map(({ value, label }) => (
        <option key={`${name}-${label}`} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}

Select.propTypes = {
  name: PropTypes.string,
  options: PropTypes.array,
};

Select.defaultProps = {
  options: [],
};
