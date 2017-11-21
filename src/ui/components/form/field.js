import React from 'react';
import { FormField } from 'semantic-ui-react';

// Wraps Semantic UI's Form.Field w/ Formik compatible event handling

class Field extends React.Component {
  handleChange = (event, data) => {
    let value;
    if (data) {
      value = data.type === 'checkbox' ? data.checked : data.value;
    } else {
      value = event.target.value;
    }
    const name = this.props.name || this.props.id;
    this.props.onChange(name, value);
  };

  handleBlur = () => {
    const name = this.props.name || this.props.id;
    this.props.onBlur(name, true);
  };

  render() {
    const { onChange, onBlur, error, ...props } = this.props;
    return (
      <FormField
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        error={error ? true : false}
        {...props}
      />
    );
  }
}

export default Field;
