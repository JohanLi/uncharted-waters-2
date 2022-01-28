import React, { useEffect } from 'react';

import Shipyard from './Shipyard';
import Menu from '../common/Menu';
import { exitBuilding } from '../../state/actionsPort';
import Harbor from './Harbor';
import Misc from './Misc';
import BuildingWrapper from './BuildingWrapper';
import { buildings } from '../../data/buildingData';

interface Props {
  buildingId: string;
}

export default function Building({ buildingId }: Props) {
  const { name, menu } = buildings[buildingId];

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
    <BuildingWrapper
      buildingId={buildingId}
      vendorMessage={{
        body: 'This feature is not implemented yet. Press ESC to exit this building.',
        showCaretDown: false,
      }}
    >
      <Menu
        options={menu.map((option) => ({
          label: option,
          value: option,
          disabled: option !== 'Sail',
        }))}
        setSelected={() => {}}
      />
    </BuildingWrapper>
  );
}
