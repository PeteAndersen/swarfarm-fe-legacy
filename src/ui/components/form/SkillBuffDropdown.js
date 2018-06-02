import React, { Component } from 'react';
import { connect } from 'react-redux';

import { bestiarySelectors } from 'state/ducks/bestiary';
import { Dropdown } from './index';

class SkillBuffDropdown extends Component {
  render() {
    const { effects, dispatch, ...props } = this.props;
    console.log(this.props);
    const buffs = Object.values(effects).reduce((accum, effect) => {
      if (effect.is_buff && effect.icon_filename) {
        accum.push({
          text: effect.name,
          value: effect.id,
          image: `${process.env.PUBLIC_URL}/assets/buffs/${effect.icon_filename}`
        });
      }
      return accum;
    }, []);

    return <Dropdown {...props} options={buffs} />;
  }
}

const mapStateToProps = state => ({
  effects: bestiarySelectors.getEffects(state)
});

export default connect(mapStateToProps)(SkillBuffDropdown);
