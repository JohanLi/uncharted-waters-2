import React from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';

import Building from './Building/Building';
import Port from './Hud/Port';
import WorldMap from './Hud/WorldMap';

import State from '../state';

const Interface = observer(() => {
  const building = State.building ? <Building /> : null;
  const hud = State.portId ? <Port /> : <WorldMap />;

  return (
    <div id="center">
      <main id="app">
        {hud}
        {building}
        <canvas id="camera" width="1280" height="800" />
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
