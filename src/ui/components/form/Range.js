import React from 'react';
import { Range } from 'rc-slider';

export default class FormikRange extends React.Component {
  handleChange = values => this.props.onChange(this.props.name || this.props.id, values);
  handleBlur = values => this.props.onBlur(this.props.name || this.props.id);

  render() {
    const { onChange, onBlur, ...props } = this.props;
    return <Range onChange={this.handleChange} onAfterChange={this.handleBlur} {...props} />;
  }
}
