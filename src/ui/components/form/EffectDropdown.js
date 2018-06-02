import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { bestiarySelectors } from 'state/ducks/bestiary';
import { Dropdown } from './index';

const isBuff = effect => effect.is_buff && effect.icon_filename;
const isDebuff = effect => !effect.is_buff && effect.icon_filename;
const isOther = effect => !effect.icon_filename;
const toDropdownOptions = effect => ({
  text: effect.name,
  value: effect.id,
  image: effect.icon_filename
    ? `${process.env.PUBLIC_URL}/assets/buffs/${effect.icon_filename}`
    : null
});

class SkillBuffDropdown extends Component {
  filterEffects = () => {
    const allEffects = Object.values(this.props.effects).sort((a, b) => (a.name > b.name ? 1 : -1));
    const { type } = this.props;
    let filterFunc;

    if (type === 'buffs') {
      filterFunc = isBuff;
    } else if (type === 'debuffs') {
      filterFunc = isDebuff;
    } else if (type === 'others') {
      filterFunc = isOther;
    }

    if (filterFunc) {
      return allEffects.reduce((accum, effect) => {
        if (filterFunc(effect)) {
          accum.push(toDropdownOptions(effect));
        }
        return accum;
      }, []);
    }

    return allEffects.map(toDropdownOptions);
  };

  render() {
    const { effects, dispatch, ...props } = this.props;

    return <Dropdown {...props} options={this.filterEffects(effects)} />;
  }
}

SkillBuffDropdown.propTypes = {
  type: PropTypes.oneOf(['buffs', 'debuffs', 'others'])
};

const mapStateToProps = (state, ownProps) => ({
  effects: bestiarySelectors.getEffects(state)
});

export default connect(mapStateToProps)(SkillBuffDropdown);
