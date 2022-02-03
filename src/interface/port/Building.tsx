import React from 'react';

import Shipyard from './shipyard/Shipyard';
import Menu from '../common/Menu';
import Harbor from './harbor/Harbor';
import BuildingWrapper from './BuildingWrapper';
import { buildings } from '../../data/buildingData';
import useBuilding from './hooks/useBuilding';
import Lodge from './Lodge';

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

  if (name === 'Lodge') {
    return <Lodge />;
  }

  const { back } = useBuilding();

  const menu = (
    <Menu
      options={options.map((option) => ({
        label: option,
        value: option,
        disabled: option !== 'Sail',
      }))}
      onSelect={() => {}}
      onCancel={back}
    />
  );

  return (
    <BuildingWrapper
      buildingId={buildingId}
      vendorMessageBox={{
        body: 'This feature is not implemented yet. Press ESC to exit this building.',
      }}
      menu={menu}
    />
  );
}
