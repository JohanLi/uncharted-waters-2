import React, { useEffect, useState } from 'react';

import Assets from '../../assets';
import { buildings } from '../../data/portData';
import DialogBox from '../common/DialogBox';
import Shipyard from './Shipyard';
import Menu from '../common/Menu';
import { setSail } from '../../state/actionsWorld';
import { exitBuilding } from '../../state/actionsPort';
import Harbor from './Harbor';
import Misc from './Misc';

interface Props {
  buildingId: number;
}

export default function Building({ buildingId }: Props) {
  const { name, menu } = buildings[buildingId];
  const [selected, setSelected] = useState<string | undefined>();

  if (name === 'Harbor') {
    return <Harbor />;
  }

  if (name === 'Shipyard') {
    return <Shipyard />;
  }

  if (name === 'Misc') {
    return <Misc />;
  }

  useEffect(() => {
    if (selected === 'Sail') {
      setSail();
    }
  }, [selected]);

  useEffect(() => {
    const onKeyup = (e: KeyboardEvent) => {
      const pressedKey = e.key.toLowerCase();

      if (pressedKey === 'escape') {
        exitBuilding();
      }
    };

    const onContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      exitBuilding();
    };

    window.addEventListener('keyup', onKeyup);
    window.addEventListener('contextmenu', onContextMenu);

    return () => {
      window.removeEventListener('keyup', onKeyup);
      window.removeEventListener('contextmenu', onContextMenu);
    };
  }, []);

  return (
    <div
      className="w-full h-full"
      style={{
        background: `url('${Assets.images.buildingBackground.toDataURL()}')`,
        backgroundSize: '256px 128px',
      }}
    >
      <div className="absolute top-4 left-4">
        <img src={Assets.buildings(buildingId)} alt="" className="w-[272px]" />
      </div>
      <DialogBox className="w-[480px] h-[256px] top-0 left-[288px] text-2xl px-8 py-6">
        {buildings[buildingId].greeting ||
          'This feature is not implemented yet. Press ESC to exit this building.'}
      </DialogBox>
      <Menu
        options={menu.map((option) => ({
          label: option,
          value: option,
          disabled: option !== 'Sail',
        }))}
        setSelected={(value) => {
          setSelected(value);
        }}
      />
    </div>
  );
}
