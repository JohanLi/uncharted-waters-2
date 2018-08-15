import React from 'react';
import { observer } from 'mobx-react';
import State from '../../state';

import styles from './port.css';
import Data from '../../port/data';

const Port = observer(() => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const date = () => `${months[State.date.getMonth()]} ${State.date.getDate()} ${State.date.getFullYear()}`;

  const timeOfDay = () => {
    let hours = State.date.getHours();
    let period = 'AM';

    if (hours >= 12) {
      period = 'PM';
    }

    hours %= 12;

    if (hours === 0) {
      hours = 12;
    }

    const minutes = State.date.getMinutes();

    if (minutes < 10) {
      return `${hours}:0${minutes} ${period}`;
    }

    return `${hours}:${minutes} ${period}`;
  };

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
          {date()}
        </div>
        <div className={styles.timeOfDay}>
          {timeOfDay()}
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
