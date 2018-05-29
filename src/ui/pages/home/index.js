import React from 'react';
import { Segment, Container } from 'semantic-ui-react';

const Home = () => (
  <Segment basic>
    <Container text>
      <p>
        Hello and welcome to swarfarm alpha! The version of SWARFARM on this domain is continuously
        updated and may contain buggy or incomplete features. If the page won't load at all, it
        might be a good idea to clear your application cache in your browser.
      </p>
    </Container>
  </Segment>
);

export default Home;
