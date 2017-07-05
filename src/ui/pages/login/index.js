import React from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";

import { authActions } from "state/ducks/auth/";
import LoginForm from "./LoginForm";

class Login extends React.Component {
  loginSubmit = values => {
    const { username, password } = values;
    this.props.attemptLogin(username, password);
  };
  render() {
    return (
      <Grid centered>
        <Grid.Column mobile={15} tablet={8} computer={4}>
          <LoginForm onSubmit={this.loginSubmit} />
        </Grid.Column>
      </Grid>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    attemptLogin: (username, password) => {
      dispatch(authActions.login(username, password));
    }
  };
};

export default connect(null, mapDispatchToProps)(Login);
