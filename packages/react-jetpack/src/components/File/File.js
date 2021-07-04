import React from 'react';
import PropTypes from 'prop-types';

import Input from '../Input';

export default function File({ name, accept, ...restProps }) {
  return (
    <Input {...restProps} type="file" id={name} name={name} accept={accept} />
  );
}

File.propTypes = {
  name: PropTypes.string,
  accept: PropTypes.string,
};
