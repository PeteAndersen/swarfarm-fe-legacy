import React from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';

import { authActions } from 'state/ducks/auth/';
import LoginForm from './LoginForm';

class Login extends React.Component {
  render() {
    return (
      <Grid centered>
        <Grid.Column mobile={15} tablet={8} computer={4}>
          <LoginForm handleSubmit={this.props.attemptLogin} />
        </Grid.Column>
      </Grid>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  attemptLogin: values =>
    new Promise((resolve, reject) => {
      dispatch(authActions.login(values.username, values.password));
    })
});

export default connect(null, mapDispatchToProps)(Login);
