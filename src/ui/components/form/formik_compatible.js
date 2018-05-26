import React from 'react';

// Converts Semantic UI form field events to Formik compatible event handling
function formikCompatible(WrappedComponent) {
  return class extends React.Component {
    handleChange = (event, data) => {
      let value;

      if (data) {
        value = data.type === 'checkbox' ? (data.indeterminate ? null : data.checked) : data.value;
      } else {
        value = event.target.value;
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
