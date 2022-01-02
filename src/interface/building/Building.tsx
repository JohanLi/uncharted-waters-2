import React, { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../hooks';
import { exit } from './buildingSlice';
import Assets from '../../assets';
import { buildings } from '../../port/metadata';

import styles from './building.css';

export const Building = () => {
  const id = useAppSelector((state) => state.building.id);
  const dispatch = useAppDispatch();

  const keydownHandler = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      dispatch(exit());
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', keydownHandler);

    return () => {
      window.removeEventListener('keydown', keydownHandler);
    };
  }, []);

  // Item Shop > ItemShop
  const name = buildings[id].name.replace(' ', '');

  return (
    <div className={styles.hud} style={{ background: `url('${Assets.buildingBackground.toDataURL()}')` }}>
      <div className={styles.building}>
        <img src={Assets[`building${name}`].toDataURL()} />
      </div>
    </div>
  );
};
