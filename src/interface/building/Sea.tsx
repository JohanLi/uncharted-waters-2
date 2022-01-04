import React, { useEffect } from 'react';

import styles from './world-map.css';
import Assets from '../../assets';
import { useAppDispatch, useAppSelector } from '../hooks';
import { dock, getFormattedDate } from '../gameSlice';

const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const Sea = () => {
  const game = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const keyup = (e: KeyboardEvent) => {
      if (e.key === 'e') {
        dispatch(dock());
      }
    };

    document.addEventListener('keyup', keyup);

    return () => {
      document.removeEventListener('keyup', keyup);
    };
  }, []);

  const indicators: JSX.Element[] = [];

  for (const [key, value] of Object.entries(game.indicators)) {
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
            {useAppSelector(getFormattedDate)}
          </div>
          <div>
            Day 0
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
              {game.water}
            </div>
            <img src={Assets.seaWater.toDataURL()} alt="Water" />
          </div>
          <div className={styles.center}>
            <div>
              {game.food}
            </div>
            <img src={Assets.seaFood.toDataURL()} alt="food" />
          </div>
          <div className={styles.center}>
            <div>
              {game.lumber}
            </div>
            <img src={Assets.seaLumber.toDataURL()} alt="Lumber" />
          </div>
          <div className={styles.center}>
            <div>
              {game.shot}
            </div>
            <img src={Assets.seaShot.toDataURL()} alt="Shot" />
          </div>
        </div>
      </div>
    </>
  );
};
