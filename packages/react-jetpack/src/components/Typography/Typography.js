import React from 'react';
import PropTypes from 'prop-types';

export default function Typography({ type, text, ...restProps }) {
  return React.createElement(`${type}`, { ...restProps }, text);
}

Typography.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string.isRequired,
};

Typography.defaultProps = {
  type: 'div',
};
