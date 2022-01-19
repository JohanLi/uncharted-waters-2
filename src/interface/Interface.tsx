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
import Camera from './Camera';

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
    <div className="flex items-stretch [image-rendering:pixelated]">
      <Left inPort={inPort} timePassed={timePassed} gold={gold}>
        <Provisions hidden={inPort} />
      </Left>
      {Boolean(buildingId) && <Building buildingId={buildingId} />}
      <div className={buildingId ? 'hidden' : ''}>
        <Camera />
      </div>
      <Right>
        {inPort && <PortInfo portId={portId} />}
        <Indicators hidden={inPort} />
      </Right>
    </div>
  );
}

const renderInterface = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Interface />
    </React.StrictMode>,
    document.getElementById('game'),
  );
};

export default renderInterface;
