import React from 'react';
import PropTypes from 'prop-types';

export default function Image({ src, alt, ...restProps }) {
  return <img {...restProps} src={src} alt={alt} />;
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
};
