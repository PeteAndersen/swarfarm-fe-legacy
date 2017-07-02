import React from "react";
import { Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import MainMenu from "ui/components/MainMenu";
import { Home, News, Bestiary } from "ui/pages";

const App = () => (
  <div>
    <MainMenu />

    <Container fluid>
      <Route path="/" component={Home} exact />
      <Route path="/news" component={News} />
      <Route path="/bestiary" component={Bestiary} />
    </Container>

    <footer>
      Da footer.
    </footer>
  </div>
);

export default App;
