import React from 'react';
import { connect } from 'react-redux';

import { authActions } from 'state/ducks/auth/'

const Home = ({auth, attemptLogin}) => (
  <div>
    <p>Hello and welcome to swarfarm beta!</p>
    {auth.isAuthenticated ? <p>auth.user.username</p> : <p>Not logged in bruh. <button onClick={attemptLogin}>Log in!!</button></p>}
    
  </div>
);

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: () => {
      dispatch(authActions.login('porksmash', 'test123'));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);