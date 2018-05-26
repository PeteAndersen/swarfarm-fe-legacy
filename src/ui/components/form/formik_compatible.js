import React from 'react';

// Converts Semantic UI form field events to Formik compatible event handling
function formikCompatible(WrappedComponent) {
  return class extends React.Component {
    handleChange = (event, data) => {
      let value;

      if (data) {
        if (data.type === 'checkbox' && data.radio !== true) {
          value = data.indeterminate ? null : data.checked;
        } else {
          value = data.value === '' ? null : data.value;
        }
      } else {
        value = event.target.value;
      }

      // Convert strings of 'null', 'true', 'false' to the actual JS type
      // because HTML inputs can only have string or number value types
      if (value === 'null') {
        value = null;
      }
      if (value === 'true') {
        value = true;
      }
      if (value === 'false') {
        value = false;
      }

      this.props.onChange(this.props.name || this.props.id, value);
    };

    handleBlur = () => {
      this.props.onBlur(this.props.name || this.props.id, true);
    };

    render() {
      const { onChange, onBlur, ...props } = this.props;
      return <WrappedComponent onChange={this.handleChange} onBlur={this.handleBlur} {...props} />;
    }
  };
}

export default formikCompatible;
