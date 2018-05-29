import React from 'react';
import { Rating } from 'semantic-ui-react';

class CompatibleRating extends React.Component {
  handleChange = (event, data) => {
    this.props.onChange(this.props.name || this.props.id, data.rating);
    this.props.onBlur(this.props.name || this.props.id, true);
  };

  render() {
    const { onChange, onBlur, value, ...props } = this.props;
    return <Rating onRate={this.handleChange} rating={value} {...props} />;
  }
}

export default CompatibleRating;
