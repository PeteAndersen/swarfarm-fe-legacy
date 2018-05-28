import React from 'react';
import styled from 'styled-components';

import MainMenu from 'ui/components/MainMenu';
import Footer from 'ui/components/Footer';
import NewContentModal from 'ui/components/NewContentModal';
import Routes from 'ui/layout/Routes';

const Body = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 1;
  margin-top: 42px;
`;

const App = props => (
  <Body>
    <MainMenu />
    <Content>
      <Routes />
    </Content>
    <Footer />
    <NewContentModal />
  </Body>
);

export default App;
