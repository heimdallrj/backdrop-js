import React from 'react';
import PropTypes from 'prop-types';

export default function Button({
  autoFocus,
  autoComplete,
  disabled,
  form,
  formAction,
  formEncType,
  formMethod,
  formNoValidate,
  formTarget,
  name,
  type,
  children,
  ...restProps
}) {
  return (
    <button
      {...restProps}
      autoFocus={autoFocus}
      autoComplete={autoComplete}
      disabled={disabled}
      form={form}
      formAction={formAction}
      formEncType={formEncType}
      formMethod={formMethod}
      formNoValidate={formNoValidate}
      formTarget={formTarget}
      name={name}
      type={type}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  autoFocus: PropTypes.bool,
  autoComplete: PropTypes.string,
  disabled: PropTypes.bool,
  form: PropTypes.string,
  formAction: PropTypes.string,
  formEncType: PropTypes.string,
  formMethod: PropTypes.string,
  formNoValidate: PropTypes.bool,
  formTarget: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.oneOf(['button', 'reset', 'submit']),
  children: PropTypes.element.isRequired,
};

Button.defaultProps = {
  type: 'button',
};
