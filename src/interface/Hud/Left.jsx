import React from 'react';
import { observer } from 'mobx-react';
import State from '../../state';

import styles from './hud.css';

const Left = observer(() => {
  if (!State.portId) {
    return null;
  }

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const date = () =>
    `${months[State.date.getMonth()]} ${State.date.getDate()} ${State.date.getFullYear()}`;

  const timeOfDay = () => {
    let hours = State.date.getHours();
    let period = 'AM';

    if (hours >= 12) {
      period = 'PM';
    }
    hours = hours % 12;

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

  return (
    <div className={styles.leftHud}>
      <div className={styles.date}>
        {date()}
      </div>
      <div className={styles.timeOfDay}>
        {timeOfDay()}
      </div>
      <div>
        Fame in<br />Adventure
      </div>
      <div className={styles.value}>
        0
      </div>
      <div>
        Gold Coins
      </div>
      <div className={styles.value}>
        {coins()}
      </div>
      <div>
        Gold Ingots
      </div>
      <div className={styles.value}>
        {ingots()}
      </div>
    </div>
  );
});

export default Left;
