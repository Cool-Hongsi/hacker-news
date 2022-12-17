import React from 'react';
import environment from 'environment';

const App = () => {
  return <div>{environment.baseUrl}</div>;
};

export default App;
