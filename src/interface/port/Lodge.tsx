import React, { useEffect } from 'react';
import useBuilding from './hooks/useBuilding';
import { VendorMessageBoxType } from '../quest/getMessageBoxes';
import Menu from '../common/Menu';
import BuildingWrapper from './BuildingWrapper';
import { checkIn } from '../../state/actionsPort';

const lodgeOptions = ['Check In', 'Gossip', 'Port Info'] as const;
type LodgeOptions = typeof lodgeOptions[number];

const lodgeDisabledOptions: LodgeOptions[] = ['Gossip', 'Port Info'];

export default function Lodge() {
  const { selectOption, back, state } = useBuilding<LodgeOptions>();

  const { option } = state;

  useEffect(() => {
    if (option === 'Check In') {
      checkIn();
    }
  }, [option]);

  const vendorMessage: VendorMessageBoxType = {
    body: 'Welcome. You must be tired. Please make yourself at home.',
  };

  const menu = (
    <Menu
      options={lodgeOptions.map((s) => ({
        label: s,
        value: s,
        disabled: lodgeDisabledOptions.includes(s),
      }))}
      onSelect={(s) => selectOption(s)}
      onCancel={back}
      hidden={option !== null}
    />
  );

  return (
    <BuildingWrapper
      buildingId="5"
      vendorMessageBox={vendorMessage}
      menu={menu}
    />
  );
}
