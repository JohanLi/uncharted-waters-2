import React, { ReactNode, useEffect } from 'react';

import Menu from '../../common/Menu';
import { setSail } from '../../../state/actionsWorld';
import BuildingWrapper from '../BuildingWrapper';
import useBuilding from '../hooks/useBuilding';
import { VendorMessageBoxType } from '../../quest/getMessageBoxes';
import HarborSupply from './HarborSupply';
import { getPlayerFleet } from '../../../state/selectorsFleet';

const harborOptions = ['Sail', 'Supply', 'Moor'] as const;
type HarborOptions = typeof harborOptions[number];

const harborDisabledOptions: HarborOptions[] = ['Moor'];

export default function Harbor() {
  const { selectOption, back, state } = useBuilding<HarborOptions>();

  useEffect(() => {
    const { option, step } = state;

    if (option === 'Sail' && step === 0) {
      setSail();
    }
  }, [state]);

  const { option } = state;

  let vendorMessage: VendorMessageBoxType = {
    body: 'Ahoy there, matey, will ye be shoving off?',
  };

  const menu = (
    <Menu
      options={harborOptions.map((s) => ({
        label: s,
        value: s,
        disabled: harborDisabledOptions.includes(s) || !getPlayerFleet().length,
      }))}
      onSelect={(s) => selectOption(s)}
      onCancel={back}
      hidden={option !== null}
    />
  );

  let children: ReactNode;

  if (option === 'Supply') {
    vendorMessage = null;
    children = <HarborSupply back={back} />;
  }

  return (
    <BuildingWrapper
      buildingId="4"
      vendorMessageBox={vendorMessage}
      menu={menu}
    >
      {children}
    </BuildingWrapper>
  );
}
