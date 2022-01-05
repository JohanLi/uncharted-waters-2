import React, { useEffect, useState } from 'react';

import { useAppSelector } from '../hooks';
import Assets from '../../assets';
import { buildings } from '../../port/metadata';
import { Dialog } from './Dialog';
import classNames from 'classnames';
import { exitBuilding, setSail } from '../../gameState';

import styles from './building.css';

export const Building = () => {
  const id = useAppSelector((state) => state.interface.buildingId);

  const { menu } = buildings[id];

  const [activeOption, setActiveOption] = useState(0);

  useEffect(() => {
    const keydownHandler = (e: KeyboardEvent) => {
      let newActiveOption = activeOption;

      if (e.key === 's') {
        newActiveOption += 1;
      }

      if (e.key === 'w') {
        newActiveOption -= 1;
      }

      if (newActiveOption >= menu.length) {
        newActiveOption = 0;
      }

      if (newActiveOption < 0) {
        newActiveOption = menu.length - 1;
      }

      setActiveOption(newActiveOption);
    };

    const keyupHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        exitBuilding();
      }

      if (e.key === 'Enter') {
        if (menu[activeOption] === 'Sail') {
          setSail();
        }
      }
    };

    window.addEventListener('keydown', keydownHandler);
    window.addEventListener('keyup', keyupHandler);

    return () => {
      window.removeEventListener('keydown', keydownHandler);
      window.removeEventListener('keyup', keyupHandler);
    };
  }, [activeOption]);


  const options = menu.map((option, i) => {
    const optionClass = classNames({
      [styles.option]: true,
      [styles.active]: activeOption === i,
      [styles.disabled]: option !== 'Sail',
    });

    return (
      <div
        key={option + activeOption}
        className={optionClass}
        onClick={() => {
          setActiveOption(i);

          if (menu[i] === 'Sail') {
            setSail();
          }
        }}
      >
        {option}
      </div>
    );
  });

  // Item Shop > ItemShop
  const name = buildings[id].name.replace(' ', '');

  return (
    <div className={styles.hud} style={{ background: `url('${Assets.buildingBackground.toDataURL()}')` }}>
      <div className={styles.building}>
        <img src={Assets[`building${name}`].toDataURL()} />
      </div>
      <Dialog position="building">
        {buildings[id].greeting || 'This feature is not implemented yet. Press ESC to exit this building.'}
      </Dialog>
      <Dialog position="buildingMenu">
        {options}
      </Dialog>
    </div>
  );
};
