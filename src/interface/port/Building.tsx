import React from 'react';

import Shipyard from './shipyard/Shipyard';
import Menu from '../common/Menu';
import Harbor from './harbor/Harbor';
import BuildingWrapper from './BuildingWrapper';
import { buildings } from '../../data/buildingData';
import useBuilding from './hooks/useBuilding';
import Lodge from './Lodge';
import Bank from './bank/Bank';
import Church from './Church';
import ItemShop from './ItemShop';

interface Props {
  buildingId: string;
}

export default function Building({ buildingId }: Props) {
  const { options } = buildings[buildingId];

  if (buildingId === '3') {
    return <Shipyard />;
  }

  if (buildingId === '4') {
    return <Harbor />;
  }

  if (buildingId === '5') {
    return <Lodge />;
  }

  if (buildingId === '9') {
    return <Bank />;
  }

  if (buildingId === '10') {
    return <ItemShop />;
  }

  if (buildingId === '11') {
    return <Church />;
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
