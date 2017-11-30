import React from 'react';
import { connect } from 'react-redux';
import { Container, Grid } from 'semantic-ui-react';

import { bestiaryActions, bestiarySelectors } from 'state/ducks/bestiary';
import { ScrollToTopOnMount } from 'ui/components';
import MonsterInfo from './MonsterInfo';
import MonsterSkills from './MonsterSkills';

class MonsterPage extends React.Component {
  componentWillMount() {
    this.props.getMonster(this.props.match.params.id);
  }

  render() {
    const { monster, skills, effects } = this.props;
    return (
      <Container>
        <ScrollToTopOnMount />
        <Grid stackable columns="equal">
          <Grid.Column>
            <MonsterInfo monster={monster} />
          </Grid.Column>
          <Grid.Column>
            <MonsterSkills skillIds={monster.skills} skills={skills} effects={effects} />
          </Grid.Column>
        </Grid>
        <h1>Monster</h1>
        <pre>{JSON.stringify(monster, null, 2)}</pre>
        <h1>Awakens From</h1>
        <pre>
          {monster.awakens_from
            ? JSON.stringify(monster.awakens_from, null, 2)
            : monster.awakens_from}
        </pre>
        <h1>Awakens To</h1>
        <pre>
          {monster.awakens_to ? JSON.stringify(monster.awakens_to, null, 2) : monster.awakens_to}
        </pre>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getMonster: id => dispatch(bestiaryActions.getMonster(id))
});

const mapStateToProps = (state, ownProps) => {
  const monster = bestiarySelectors.getMonsters(state, ownProps.match.params.id);

  if (monster.awakens_from) {
    monster.awakens_from = bestiarySelectors.getMonsters(state, monster.awakens_from);
  }

  if (monster.awakens_to) {
    monster.awakens_to = bestiarySelectors.getMonsters(state, monster.awakens_to);
  }

  const skills = bestiarySelectors.getSkills(state, monster.skills);

  const effectIds = monster.skills.reduce((ids, skillId) => {
    const skill_effect_ids = skills[skillId].effects.map(effect => effect.effect);
    return ids.concat(skill_effect_ids);
  }, []);

  const effects = bestiarySelectors.getEffects(state, effectIds);

  return {
    monster,
    skills,
    effects
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MonsterPage);
