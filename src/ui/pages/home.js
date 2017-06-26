import React from "react";
import { connect } from "react-redux";

import { authActions } from "state/ducks/auth/";

const Home = ({ auth, attemptLogin, logout }) => (
  <div>
    <p>Hello and welcome to swarfarm beta!</p>
    {auth.isAuthenticated
      ? <p>
          {auth.user.username}
          <button onClick={logout}>Log out like a loser</button>
        </p>
      : <p>
          Not logged in bruh. <button onClick={attemptLogin}>Log in!!</button>
        </p>}

    {auth.isLoading ? <p>LOGGING IN BRUH</p> : null}

  </div>
);

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    attemptLogin: () => {
      dispatch(authActions.login("porksmashtest", "fakepass"));
    },
    logout: () => {
      dispatch(authActions.logout());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
