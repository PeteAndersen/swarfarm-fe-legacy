import React from 'react';
import { FormField } from 'semantic-ui-react';

class Input extends React.Component {
  handleChange = event => {
    this.props.onChange(this.props.name, event.target.value);
  };

  handleBlur = () => {
    this.props.onBlur(this.props.name, true);
  };

  render() {
    const { onChange, onBlur, error, ...props } = this.props;
    return (
      <FormField
        control="input"
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        error={error ? true : false}
        {...props}
      />
    );
  }
}

export default Input;
