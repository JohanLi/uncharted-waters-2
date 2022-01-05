import React from 'react';

import styles from './world-map.css';
import Assets from '../../assets';
import { useAppSelector } from '../hooks';
import { getDate } from '../interfaceSlice';

const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const Sea = () => {
  const state = useAppSelector((state) => state.interface);

  const indicators: JSX.Element[] = [];

  for (const [key, value] of Object.entries(state.indicators)) {
    indicators.push(
      <div className={styles.indicator} key={key}>
        <div className={styles.key}>
          {capitalizeFirstLetter(key)}
        </div>
        <div className={styles.iconValue}>
          <div className={styles.icon} style={{ backgroundPositionX: value.direction * -80 }}/>
          <div className={styles.value}>
            {value.speed}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.leftHud}>
        <div className={styles.dateAndDay}>
          <div className={styles.date}>
            {useAppSelector(getDate)}
          </div>
          <div>
            Day {state.dayAtSea}
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
              {state.water}
            </div>
            <img src={Assets.seaWater.toDataURL()} alt="Water" />
          </div>
          <div className={styles.center}>
            <div>
              {state.food}
            </div>
            <img src={Assets.seaFood.toDataURL()} alt="food" />
          </div>
          <div className={styles.center}>
            <div>
              {state.lumber}
            </div>
            <img src={Assets.seaLumber.toDataURL()} alt="Lumber" />
          </div>
          <div className={styles.center}>
            <div>
              {state.shot}
            </div>
            <img src={Assets.seaShot.toDataURL()} alt="Shot" />
          </div>
        </div>
      </div>
    </>
  );
};
