import React, { useEffect, useState } from 'react';

import Assets from '../../assets';
import { buildings } from '../../port/metadata/portMetadata';
import DialogBox from '../DialogBox';
import { classNames } from '../interfaceUtils';
import { exitBuilding } from '../../state/actionsPort';
import { setSail } from '../../state/actionsWorld';

interface Props {
  buildingId: number;
}

export default function Building({ buildingId }: Props) {
  const { menu } = buildings[buildingId];

  const [activeOption, setActiveOption] = useState(0);

  useEffect(() => {
    const keydownHandler = (e: KeyboardEvent) => {
      const pressedKey = e.key.toLowerCase();
      let newActiveOption = activeOption;

      if (pressedKey === 's') {
        newActiveOption += 1;
      }

      if (pressedKey === 'w') {
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
      const pressedKey = e.key.toLowerCase();

      if (pressedKey === 'escape') {
        exitBuilding();
      }

      if (pressedKey === 'e' || pressedKey === 'enter') {
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

  const options = menu.map((option, i) => (
    <button
      key={option}
      className={classNames(
        'text-center text-2xl px-0 py-1 mx-0 my-2 cursor-pointer w-full block outline-none',
        activeOption === i && option === 'Sail' ? 'bg-black text-white' : '',
        activeOption === i && option !== 'Sail' ? 'bg-black text-gray-400' : '',
        activeOption !== i && option === 'Sail' ? 'text-black' : '',
        activeOption !== i && option !== 'Sail' ? 'text-gray-400' : '',
      )}
      onClick={() => {
        setActiveOption(i);

        if (menu[i] === 'Sail') {
          setSail();
        }
      }}
      type="button"
    >
      {option}
    </button>
  ));

  return (
    <div
      className="w-full h-full"
      style={{
        background: `url('${Assets.images.buildingBackground.toDataURL()}')`,
        lineHeight: 1.5,
        backgroundSize: '256px 128px',
      }}
    >
      <div className="absolute top-4 left-4">
        <img src={Assets.buildings(buildingId)} alt="" className="w-[272px]" />
      </div>
      <DialogBox className="w-[480px] h-[256px] top-0 left-[288px] text-2xl text-black px-8 py-6">
        {buildings[buildingId].greeting ||
          'This feature is not implemented yet. Press ESC to exit this building.'}
      </DialogBox>
      <DialogBox className="w-[240px] top-[190px] left-[768px]">
        {options}
      </DialogBox>
    </div>
  );
}
