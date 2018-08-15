import React from 'react';
import { observer } from 'mobx-react';
import State from '../../state';

import styles from './world-map.css';
import Assets from '../../assets';

const capitalizeFirstLetter = str => str.charAt(0).toUpperCase() + str.slice(1);

const WorldMap = observer(() => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const date = () => `${months[State.date.getMonth()]} ${State.date.getDate()} ${State.date.getFullYear()}`;

  const indicators = ['wind', 'current', 'fleet'].map((key) => {
    const indicator = State[key];

    return (
      <div className={styles.indicator} key={key}>
        <div className={styles.key}>
          {capitalizeFirstLetter(key)}
        </div>
        <div className={styles.iconValue}>
          <div className={styles.icon} style={{ backgroundPositionX: indicator.direction * -80 }} />
          <div className={styles.value}>
            {indicator.speed}
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className={styles.leftHud}>
        <div className={styles.dateAndDay}>
          <div className={styles.date}>
            {date()}
          </div>
          <div>
            Day {State.dayAtSea}
          </div>
        </div>
        <div className={styles.indicators}>
          {indicators}
        </div>
      </div>
      <div className={styles.rightHud}>
        <div className={styles.provisions}>
          <div>
            Provisions
          </div>
          <div className={styles.center}>
            <div>
              {State.water}
            </div>
            <img src={Assets.assets.worldMap.water.src} alt="Water" />
          </div>
          <div className={styles.center}>
            <div>
              {State.food}
            </div>
            <img src={Assets.assets.worldMap.food.src} alt="food" />
          </div>
          <div className={styles.center}>
            <div>
              {State.lumber}
            </div>
            <img src={Assets.assets.worldMap.lumber.src} alt="Lumber" />
          </div>
          <div className={styles.center}>
            <div>
              {State.shot}
            </div>
            <img src={Assets.assets.worldMap.shot.src} alt="Shot" />
          </div>
        </div>
      </div>
    </>
  );
});

export default WorldMap;
