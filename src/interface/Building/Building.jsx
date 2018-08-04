import { observer } from 'mobx-react';
import React from 'react';
import classNames from 'classnames';

import Dialog from '../Dialog/Dialog';
import assets from '../../assets';
import state from '../../state';

import styles from './building.css';

const Building = observer(() => {
  const type = state.building;

  if (type === '') {
    return null;
  }

  const key = assets.ports.buildings[type].replace(/\s+/g, '-').toLowerCase();

  const options = assets.buildings[type].menu.map((option, i) => {
    console.log(state.selectedMenu);
    console.log(i);

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
        <img src={assets.buildingAssets[key].src} alt=''/>
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
