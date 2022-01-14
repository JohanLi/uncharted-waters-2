import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import Right from './Right';
import Left from './Left';
import PortInfo from './port/PortInfo';
import Building from './port/Building';
import Provisions from './world/Provisions';
import Indicators from './world/Indicators';
import updateInterface from '../state/updateInterface';

import './global.css';

function Interface() {
  const [portId, setPortId] = useState(0);
  const [buildingId, setBuildingId] = useState(0);
  const [timePassed, setTimePassed] = useState(0);
  const [gold, setGold] = useState(0);

  updateInterface.general = (general) => {
    setPortId(general.portId);
    setBuildingId(general.buildingId);
    setTimePassed(general.timePassed);
    setGold(general.gold);
  };

  const inPort = Boolean(portId);

  return (
    <>
      <Left inPort={inPort} timePassed={timePassed} gold={gold}>
        <Provisions hidden={inPort} />
      </Left>
      <Right>
        {inPort && <PortInfo portId={portId} />}
        <Indicators hidden={inPort} />
      </Right>
      {Boolean(buildingId) && <Building buildingId={buildingId} />}
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
      <Interface />
    </React.StrictMode>,
    document.getElementById('interface'),
  );
};

export default renderInterface;
