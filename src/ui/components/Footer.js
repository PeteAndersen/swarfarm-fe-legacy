import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';

const Footer = () =>
  <Menu widths={3}>
    <Menu.Item>
      <a href="https://github.com/porksmash/swarfarm" target="_blank" rel="noopener noreferrer">
        <Icon name="github" /> Github
      </a>
    </Menu.Item>
    <Menu.Item>
      Like the site? <a href="https://swarfarm.com/donate/">&nbsp;Donate!</a>
    </Menu.Item>
    <Menu.Item>
      <Icon name="copyright" /> Porksmash 2017 ⋅ Images <Icon name="copyright" /> Com2Us
    </Menu.Item>
  </Menu>;

export default Footer;
