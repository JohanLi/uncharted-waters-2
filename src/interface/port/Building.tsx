import React from 'react';

import Shipyard from './Shipyard';
import Menu from '../common/Menu';
import Harbor from './Harbor';
import BuildingWrapper from './BuildingWrapper';
import { buildings } from '../../data/buildingData';
import useBuildingState from './hooks/useBuildingState';

interface Props {
  buildingId: string;
}

export default function Building({ buildingId }: Props) {
  const { name, options } = buildings[buildingId];

  if (name === 'Harbor') {
    return <Harbor />;
  }

  if (name === 'Shipyard') {
    return <Shipyard />;
  }

  useBuildingState();

  const menu = (
    <Menu
      options={options.map((option) => ({
        label: option,
        value: option,
        disabled: option !== 'Sail',
      }))}
      setSelected={() => {}}
    />
  );

  return (
    <BuildingWrapper
      buildingId={buildingId}
      greeting="This feature is not implemented yet. Press ESC to exit this building."
      vendorMessageBox={null}
      menu={menu}
    />
  );
}
