import React from 'react';
import { FormSelect } from 'semantic-ui-react';

class Select extends React.Component {
  handleChange = (event, data) => {
    this.props.onChange(this.props.name, data.value);
  };

  handleBlur = () => {
    this.props.onBlur(this.props.name, true);
  };

  render() {
    const { onChange, onBlur, error, ...props } = this.props;

    return (
      <FormSelect
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        error={error ? true : false}
        {...props}
      />
    );
  }
}

export default Select;
