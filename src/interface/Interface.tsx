import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import Right from './Right';
import Left from './Left';
import PortInfo from './port/PortInfo';
import Building from './port/Building';
import Provisions from './world/Provisions';
import Indicators from './world/Indicators';
import updateInterface from './updateInterface';
import type { ProvisionsType } from '../state/state';

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

  /*
    TODO
      Defined here, as <Provisions /> won’t be immediately mounted after setting sail.
      Look into using hidden or useEffect.
      Lumber and shot do not change while sailing, so could be split out
   */
  const [provisions, setProvisions] = useState<ProvisionsType>({
    water: 0,
    food: 0,
    lumber: 0,
    shot: 0,
  });

  updateInterface.provisions = (p) => {
    setProvisions(p);
  };

  return (
    <>
      <Left inPort={Boolean(portId)} timePassed={timePassed} gold={gold}>
        {!portId && <Provisions provisions={provisions} />}
      </Left>
      <Right>
        {Boolean(portId) && <PortInfo portId={portId} />}
        <Indicators hidden={Boolean(portId)} />
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
