import { observer } from 'mobx-react';
import React from 'react';
import classNames from 'classnames';

import Dialog from '../Dialog/Dialog';
import Assets from '../../assets';
import state from '../../state';

import styles from './building.css';

const nameToKey = input => input[0].toLowerCase() + input.slice(1).replace(/\s/g, '');

const Building = observer(() => {
  const id = state.building;

  if (!id) {
    return null;
  }

  const name = Assets.assets.buildingData[id].name;
  const key = nameToKey(name);

  const options = Assets.assets.buildingData[id].menu.map((option, i) => {
    const optionClass = classNames({
      [styles.option]: true,
      [styles.active]: state.selectedMenu === i,
    });

    return (
      <div
        key={option}
        className={optionClass}
      >
        {option}
      </div>
    );
  });
  state.menuLength = options.length;

  return (
    <div className={styles.hud}>
      <div className={styles.building}>
        <img src={Assets.assets.buildings[key].src} alt=''/>
      </div>
      <Dialog position='building'>
        This feature is not implemented yet. Press ESC to exit this building.
      </Dialog>
      <Dialog position='buildingMenu'>
        {options}
      </Dialog>
    </div>
  );
});

export default Building;
