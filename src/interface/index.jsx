import React from 'react';
import ReactDOM from 'react-dom';

import Building from './Building/Building';
import Left from './Hud/Left';
import Right from './Hud/Right';

const Interface = () => (
  <div id='center'>
    <main id='app'>
      <Left />
      <Right />
      <Building />
      <canvas id='camera' width='1280' height='800' />
    </main>
  </div>
);

const renderInterface = () => {
  ReactDOM.render(
    <Interface />,
    document.getElementById('root'),
  );
};

export default renderInterface;
