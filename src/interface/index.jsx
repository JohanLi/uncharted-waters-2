import React from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';

import Building from './Building/Building';
import Left from './Hud/Left';
import Right from './Hud/Right';

import State from '../state';

const Interface = observer(() => {
  let building;

  if (State.building) {
    building = <Building />;
  }

  return (
    <div id='center'>
      <main id='app'>
        <Left />
        <Right />
        {building}
        <canvas id='camera' width='1280' height='800' />
      </main>
    </div>
  );
});

const renderInterface = () => {
  ReactDOM.render(
    <Interface />,
    document.getElementById('root'),
  );
};

export default renderInterface;
