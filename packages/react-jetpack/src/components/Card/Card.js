import React from 'react';
import PropTypes from 'prop-types';

export default function Card({ style, children, ...restProps }) {
  return (
    <div {...restProps} style={style}>
      {children}
    </div>
  );
}

Card.propTypes = {
  style: PropTypes.object,
  children: PropTypes.element.isRequired,
};
