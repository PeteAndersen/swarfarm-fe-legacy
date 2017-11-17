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
          <LoginForm
            handleSubmit={this.props.attemptLogin}
            isLoading={this.props.isLoading}
            submitErrors={this.props.errors}
          />
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.auth.isLoading,
  errors: state.auth.error
});

const mapDispatchToProps = dispatch => ({
  attemptLogin: values => {
    dispatch(authActions.login(values.username, values.password));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
