import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';

class Pager extends React.Component {
  isPreviousDisabled = () => {
    return this.props.currentPage === 1;
  };

  isNextDisabled = () => {
    return this.props.currentPage === this.props.numPages;
  };

  getPageButtons = () => {
    const buttons = [];
    const numButtons = this.props.visibleButtons || 5;
    const buttonCountDelta = Math.floor(numButtons / 2);
    // Clip first button between page 1 and (numPages - numButtons)
    const startPage = Math.max(
      1,
      Math.min(this.props.currentPage - buttonCountDelta, this.props.numPages - numButtons + 1)
    );
    const endPage = startPage + buttonCountDelta * 2;

    if (startPage > 1) {
      buttons.push(
        <Menu.Item key={0} disabled>
          ...
        </Menu.Item>
      );
    }

    for (let x = startPage; x <= endPage; x++) {
      buttons.push(
        <Menu.Item
          key={x}
          page={x}
          active={this.props.currentPage === x}
          onClick={this.props.onPageChange}
        >
          {x}
        </Menu.Item>
      );
    }

    if (endPage < this.props.numPages) {
      buttons.push(
        <Menu.Item key={this.props.numPages + 1} disabled>
          ...
        </Menu.Item>
      );
    }

    return buttons;
  };

  render() {
    const buttons = this.getPageButtons();
    const { currentPage, numPages, onPageChange, visibleButtons, ...props } = this.props;

    return (
      <Menu {...props}>
        <Menu.Item
          page={1}
          onClick={onPageChange}
          disabled={this.isPreviousDisabled()}
          icon="angle double left"
        />
        <Menu.Item
          page={currentPage - 1}
          onClick={onPageChange}
          disabled={this.isPreviousDisabled()}
          icon="angle left"
        />
        {buttons}
        <Menu.Item
          page={currentPage + 1}
          onClick={onPageChange}
          disabled={this.isNextDisabled()}
          icon="angle right"
        />
        <Menu.Item
          page={numPages}
          onClick={onPageChange}
          disabled={this.isNextDisabled()}
          icon="angle double right"
        />
      </Menu>
    );
  }
}

Pager.propTypes = {
  currentPage: PropTypes.number.isRequired,
  numPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  visibleButtons: PropTypes.number,
}

export default Pager;
