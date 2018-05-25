import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

const GlobalLoader = () => (
  <Dimmer active inverted>
    <Loader indeterminate>Loading SWARFARM...</Loader>
  </Dimmer>
);

export default GlobalLoader;
