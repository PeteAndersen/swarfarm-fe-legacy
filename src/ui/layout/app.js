import React from "react";
import { Route } from "react-router-dom";
import styled from "styled-components";

import MainMenu from "ui/components/MainMenu";
import Footer from "ui/components/Footer";
import { Home, News, Bestiary } from "ui/pages";

const Body = styled.div`
display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 1;
`;

const App = () => (
  <Body>
    <MainMenu />
    <Content>
      <Route path="/" component={Home} exact />
      <Route path="/news" component={News} />
      <Route path="/bestiary" component={Bestiary} />
    </Content>
    <Footer />
  </Body>
);

export default App;
