import { observer } from 'mobx-react';
import * as React from 'react';

import Dialog from './Dialog';

import assets from '../assets';
import state from '../state';

const Building = observer(() => {
  const type = state.building;

  if (type === '') {
    return null;
  }

  const key = assets.ports.buildings[type].replace(/\s+/g, '-').toLowerCase();

  const options = assets.buildings[type].menu;
  state.menuLength = options.length;

  return (
    <div id='building-hud'>
      <div id='shop'>
        <img src={assets.buildingAssets[key].src} alt=''/>
      </div>
      <Dialog id='dialog'>
        This feature is not implemented yet. Press ESC to exit this building.
      </Dialog>
      <Dialog id='options' options={options} dialogOption={state.selectedMenu}/>
    </div>
  );
});

export default Building;
