import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Menu, Dropdown, Icon, Divider } from "semantic-ui-react";

import { authActions } from "state/ducks/auth/";

class MainMenu extends React.Component {
  render() {
    return (
      <Menu>
        <Menu.Item as={Link} to="/">Home</Menu.Item>
        <Menu.Item as={Link} to="/news">News</Menu.Item>
        <Menu.Item as={Link} to="/bestiary">Bestiary</Menu.Item>
        {this.props.auth.isAuthenticated
          ? <Menu.Menu position="right">
              <Dropdown item floating text={this.props.auth.user.username}>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/profile/edit">
                    <Icon name="user" />Edit Profile
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/profile/edit">
                    <Icon name="users" />Friends
                  </Dropdown.Item>
                  <Divider />
                  <Dropdown.Item onClick={this.props.logout}>
                    Log Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Menu>
          : <Menu.Menu position="right">
              <Menu.Item as={Link} to="/login">Log In</Menu.Item>
              <Menu.Item as={Link} to="/register">Register</Menu.Item>
            </Menu.Menu>}
      </Menu>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(authActions.logout());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);
