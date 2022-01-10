import React, { useEffect, useState } from 'react';

import { useAppSelector } from '../hooks';
import Assets, { ImageKeys } from '../../assets';
import { buildings } from '../../port/metadata';
import DialogBox from '../DialogBox';
import { exitBuilding, setSail } from '../../gameState';
import { classNames } from '../interfaceUtils';

export default function Building() {
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
    const optionClass = classNames(
      'text-center text-2xl px-0 py-1 mx-0 my-2 cursor-pointer',
      activeOption === i ? 'bg-black text-white' : 'text-black',
    );

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
  const imageKey = `building${buildings[id].name.replace(
    ' ',
    '',
  )}` as ImageKeys;

  return (
    <div
      className="w-full h-full absolute"
      style={{
        background: `url('${Assets.images.buildingBackground.toDataURL()}')`,
        lineHeight: 1.5,
      }}
    >
      <div className="absolute top-4 left-4">
        <img src={Assets.images[imageKey].toDataURL()} alt="" />
      </div>
      <DialogBox className="w-[480px] h-[256px] top-0 left-[288px] text-2xl text-black px-8 py-6">
        {buildings[id].greeting ||
          'This feature is not implemented yet. Press ESC to exit this building.'}
      </DialogBox>
      <DialogBox className="w-[240px] top-[190px] left-[768px]">
        {options}
      </DialogBox>
    </div>
  );
}
