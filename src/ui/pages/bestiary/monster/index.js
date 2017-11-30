import React from 'react';
import { connect } from 'react-redux';
import { denormalize } from 'normalizr';
import { Container, Grid } from 'semantic-ui-react';

import { bestiaryActions, bestiarySelectors, bestiarySchema } from 'state/ducks/bestiary';
import { ScrollToTopOnMount } from 'ui/components';
import MonsterInfo from './MonsterInfo';
import MonsterSkills from './MonsterSkills';

class MonsterPage extends React.Component {
  componentWillMount() {
    this.props.getMonster(this.props.match.params.id);
  }

  render() {
    const { monster } = this.props;
    console.log(monster);

    return (
      <Container>
        <ScrollToTopOnMount />
        <Grid stackable columns="equal">
          <Grid.Column>
            <MonsterInfo monster={monster} />
          </Grid.Column>
          <Grid.Column>
            <MonsterSkills skills={monster.skills} />
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getMonster: id => dispatch(bestiaryActions.getMonster(id))
});

const mapStateToProps = (state, ownProps) => ({
  monster: denormalize(
    bestiarySelectors.getMonsters(state, ownProps.match.params.id),
    bestiarySchema.monster,
    state.bestiary.entities
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(MonsterPage);
