import React from 'react';

import styles from './port.css';
import { useAppSelector } from '../hooks';
import { markets, ports } from '../../port/metadata';
import { getFormattedDate, getTime } from '../gameSlice';

export const Port = () => {
  const { portId, gold } = useAppSelector((state) => state.game);

  const ingots = () => Math.floor(gold / 10000);
  const coins = () => gold % 10000;

  const {
    name,
    economy,
    industry,
    economyId,
  } = ports[portId];
  const territory = markets[economyId];

  return (
    <>
      <div className={styles.leftHud}>
        <div className={styles.date}>
          {useAppSelector(getFormattedDate)}
        </div>
        <div className={styles.timeOfDay}>
          {useAppSelector(getTime)}
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
};
