import React from 'react';
import { observer } from 'mobx-react';
import Assets from '../../assets';
import state from '../../state';

import styles from './hud.css';

const Right = observer(() => {
  if (!state.portId) {
    return null;
  }

  const { name, economy, industry, economyId } = Assets.assets.ports[state.portId];
  const territory = Assets.assets.ports.markets[economyId];

  return (
    <div className={styles.rightHud}>
      <div className={styles.port}>
        {name}
      </div>
      <div className={styles.timeOfDay}>
        {territory}
      </div>
      <div>
        Economy
      </div>
      <div className={styles.value}>
        {economy}
      </div>
      <div>
        Investment
      </div>
      <div className={styles.value}>
        0
      </div>
      <div>
        Industry
      </div>
      <div className={styles.value}>
        {industry}
      </div>
      <div>
        Investment
      </div>
      <div className={styles.value}>
        0
      </div>
      <div>
        Price Index
      </div>
      <div className={styles.value}>
        100%
      </div>
    </div>
  );
});

export default Right;
