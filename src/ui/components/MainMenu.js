import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Icon, Divider } from 'semantic-ui-react';

import { authActions } from 'state/ducks/auth/';

class MainMenu extends React.Component {
  render() {
    return (
      <Menu>
        <Menu.Item as={Link} to="/" header>
          SWARFARM
        </Menu.Item>
        <Menu.Item as={Link} to="/news" active={this.props.path.startsWith('/news')}>
          News
        </Menu.Item>
        <Menu.Item as={Link} to="/bestiary" active={this.props.path.startsWith('/bestiary')}>
          Bestiary
        </Menu.Item>
        {this.props.auth.isAuthenticated ? (
          <Menu.Menu position="right">
            <Dropdown item floating text={this.props.auth.user.username}>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/profile/edit">
                  <Icon name="user" />Edit Profile
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/profile/friends">
                  <Icon name="users" />Friends
                </Dropdown.Item>
                <Divider />
                <Dropdown.Item onClick={this.props.logout}>Log Out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        ) : (
          <Menu.Menu position="right">
            <Menu.Item as={Link} to="/login" active={this.props.path.startsWith('/login')}>
              Log In
            </Menu.Item>
            <Menu.Item as={Link} to="/register" active={this.props.path.startsWith('/register')}>
              Register
            </Menu.Item>
          </Menu.Menu>
        )}
      </Menu>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  path: state.router.location.pathname
});

const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch(authActions.logout());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);
