import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './store';
import { useAppSelector } from './hooks';
import Right from './Right';
import Left from './Left';
import PortInfo from './port/PortInfo';
import Building from './port/Building';
import Provisions from './sea/Provisions';
import Indicators from './sea/Indicators';

import './global.css';

function Interface() {
  const { portId, buildingId } = useAppSelector((state) => state.interface);

  return (
    <>
      <Left>{!portId && <Provisions />}</Left>
      <Right>{portId ? <PortInfo /> : <Indicators />}</Right>
      {Boolean(buildingId) && <Building />}
    </>
  );
}

const renderInterface = () => {
  const game = document.getElementById('game');

  if (!game) {
    throw Error('The element used for rendering the game is missing!');
  }

  game.innerHTML = `
    <canvas id="camera" width="1280" height="800"></canvas>
    <div id="interface"></div>
  `;

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <Interface />
      </Provider>
    </React.StrictMode>,
    document.getElementById('interface'),
  );
};

export default renderInterface;
