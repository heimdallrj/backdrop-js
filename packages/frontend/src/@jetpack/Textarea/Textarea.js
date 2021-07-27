import React from 'react';
import PropTypes from 'prop-types';

export default function Textarea({ name, text, rows, cols, ...restProps }) {
  return (
    <textarea {...restProps} id={name} name={name} rows={rows} cols={cols}>
      {text}
    </textarea>
  );
}

Textarea.propTypes = {
  name: PropTypes.string,
  text: PropTypes.string,
  rows: PropTypes.number,
  cols: PropTypes.number,
};

Textarea.defaultProps = {};
