import React from 'react';
import { observer } from 'mobx-react';
import State from '../../state';

import styles from './port.css';
import Data from '../../port/data';

const Port = observer(() => {
  const ingots = () => Math.floor(State.gold / 10000);
  const coins = () => State.gold % 10000;

  const {
    name,
    economy,
    industry,
    economyId,
  } = Data.ports[State.portId];
  const territory = Data.markets[economyId];

  return (
    <>
      <div className={styles.leftHud}>
        <div className={styles.date}>
          {State.formattedDate()}
        </div>
        <div className={styles.timeOfDay}>
          {State.time()}
        </div>
        <div>
          Ingots
        </div>
        <div className={styles.value}>
          {ingots()}
        </div>
        <div>
          Coins
        </div>
        <div className={styles.value}>
          {coins()}
        </div>
      </div>
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
    </>
  );
});

export default Port;
