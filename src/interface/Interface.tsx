import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import Right from './Right';
import Left from './Left';
import PortInfo from './port/PortInfo';
import Provisions from './world/Provisions';
import Indicators from './world/Indicators';
import Camera from './Camera';
import updateInterface from '../state/updateInterface';
import Building from './port/Building';
import { classNames } from './interfaceUtils';
import useFade from './port/hooks/useFade';

import './global.css';

function Interface() {
  const [portId, setPortId] = useState<string | null>(null);
  const [buildingId, setBuildingId] = useState<string | null>(null);
  const [timePassed, setTimePassed] = useState(0);
  const [gold, setGold] = useState(0);

  updateInterface.general = (general) => {
    setPortId(general.portId);
    setBuildingId(general.buildingId);
    setTimePassed(general.timePassed);
    setGold(general.gold);
  };

  const { fade, onAnimationEnd } = useFade();

  const inPort = portId !== null;

  return (
    <div className="[image-rendering:pixelated]">
      <div className="flex items-stretch">
        <Left
          portId={portId}
          buildingId={buildingId}
          timePassed={timePassed}
          gold={gold}
        >
          <Provisions hidden={inPort} />
        </Left>
        <div
          className={classNames(
            'w-[1280px] h-[800px] relative select-none',
            fade ? 'fade-out' : '',
          )}
          onAnimationEnd={onAnimationEnd}
        >
          {buildingId !== null && <Building buildingId={buildingId} />}
          <div className={buildingId ? 'hidden' : ''}>
            <Camera />
          </div>
        </div>
        <Right>
          {inPort && <PortInfo portId={portId} />}
          <Indicators hidden={inPort} />
        </Right>
      </div>
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
