import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { exit, } from './buildingSlice';
import Assets from '../../assets';
import { buildings } from '../../port/metadata';

import styles from './building.css';

interface Props {
  buildingId: number;
};

export const Building = (props: Props) => {
  const { buildingId } = props;
  const dispatch = useDispatch();

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
  const name = buildings[buildingId].name.replace(' ', '');

  return (
    <div className={styles.hud} style={{ background: `url('${Assets.buildingBackground.toDataURL()}')` }}>
      <div className={styles.building}>
        <img src={Assets[`building${name}`].toDataURL()} />
      </div>
    </div>
  );
};
