import React from 'react';
import classnames from 'classnames';
import { Dropdown } from 'semantic-ui-react';
import timezones from 'services/timezones';

const Label = ({ children, ...props }) => {
  return <label {...props}>{children}</label>;
};

const TimezoneSelect = ({
  type,
  id,
  name,
  label,
  error,
  className,
  defaultSelection,
  ...props
}) => {
  const classes = classnames(className, 'field', { error: error });

  return (
    <div className={classes}>
      <Label htmlFor={id}>{label}</Label>
      <Dropdown selection fluid options={timezones} id={name} {...props} />
    </div>
  );
};

export default TimezoneSelect;
