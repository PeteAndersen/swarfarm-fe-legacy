import React from 'react';
import { connect } from 'react-redux';
import { denormalize } from 'normalizr';
import { Container, Grid, Menu, Loader, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { bestiaryActions, bestiarySelectors, bestiarySchema } from 'state/ducks/bestiary';
import { ScrollToTopOnMount } from 'ui/components';
import { LeaderSkill } from 'ui/components/skills';

import Info from './info';
import Skills from './skills';
import Stats from './stats';
import ElementSwitcher from './element_switcher';

class MonsterPage extends React.Component {
  componentWillMount() {
    // Update the monster and skills
    this.props.getMonster(this.props.match.params.id);
  }

  render() {
    const { monster, family } = this.props;

    return (
      <Container>
        <ScrollToTopOnMount />
        <Menu>
          <Menu.Item as={Link} to="/bestiary">
            <Icon name="arrow left" />Back
          </Menu.Item>
          <ElementSwitcher family={family} prefer_awakened={monster.is_awakened} position="right" />
        </Menu>

        {monster ? (
          <Grid stackable columns="equal">
            <Grid.Column>
              <Info monster={monster} />
              <Stats monster={monster} />
            </Grid.Column>
            <Grid.Column>
              {monster.leader_skill ? <LeaderSkill skill={monster.leader_skill} /> : null}
              <Skills skills={monster.skills} />
            </Grid.Column>
          </Grid>
        ) : (
          <Loader>Loading</Loader>
        )}
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getMonster: id => dispatch(bestiaryActions.getMonster(id))
});

const mapStateToProps = (state, ownProps) => {
  const monster = denormalize(
    bestiarySelectors.getMonsters(state, ownProps.match.params.id),
    bestiarySchema.monster,
    state.bestiary.entities
  );

  return {
    monster,
    family: monster ? bestiarySelectors.getMonsterFamily(state, monster.family_id) : {}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MonsterPage);
