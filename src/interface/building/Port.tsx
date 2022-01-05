import React from 'react';

import styles from './port.css';
import { useAppSelector } from '../hooks';
import { markets, ports } from '../../port/metadata';
import { getCoins, getDate, getHoursMinutes, getIngots } from '../interfaceSlice';

export const Port = () => {
  const { portId } = useAppSelector((state) => state.interface);

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
          {useAppSelector(getDate)}
        </div>
        <div className={styles.timeOfDay}>
          {useAppSelector(getHoursMinutes)}
        </div>
        <div>
          Ingots
        </div>
        <div className={styles.value}>
          {useAppSelector(getIngots)}
        </div>
        <div>
          Coins
        </div>
        <div className={styles.value}>
          {useAppSelector(getCoins)}
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
