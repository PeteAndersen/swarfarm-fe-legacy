import React from "react";
import { Link } from "react-router-dom";
import { Menu, Input } from "semantic-ui-react";

const MainMenu = () => (
  <Menu>
    <Menu.Item as={Link} to="/">Home</Menu.Item>
    <Menu.Item as={Link} to="/news">News</Menu.Item>
    <Menu.Item as={Link} to="/bestiary">Bestiary</Menu.Item>

    <Menu.Menu position="right">
      <Menu.Item>
        <Input placeholder="Username" icon="user" />
      </Menu.Item>
      <Menu.Item>
        <Input placeholder="Password" icon="lock" />
      </Menu.Item>
      <Menu.Item name="Log In" />
    </Menu.Menu>
  </Menu>
);

export default MainMenu;
