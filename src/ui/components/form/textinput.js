import React from 'react';
import classnames from 'classnames';

const Label = ({ children, ...props }) => {
  return <label {...props}>{children}</label>;
};

const TextInput = ({ type, id, label, error, value, onChange, className, ...props }) => {
  const classes = classnames(className, 'field', { error: error });

  return (
    <div className={classes}>
      <Label htmlFor={id}>{label}</Label>
      <input
        id={id}
        className="text-input"
        type={type}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

export default TextInput;
