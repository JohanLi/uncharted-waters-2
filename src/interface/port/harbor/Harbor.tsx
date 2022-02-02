import React, { ReactNode, useEffect } from 'react';

import Menu from '../../common/Menu';
import { setSail } from '../../../state/actionsWorld';
import BuildingWrapper from '../BuildingWrapper';
import useBuildingState from '../hooks/useBuildingState';
import { VendorMessageBoxType } from '../../quest/getMessageBoxes';
import HarborSupply from './HarborSupply';

const harborOptions = ['Sail', 'Supply', 'Moor'] as const;
type HarborOptions = typeof harborOptions[number];

const harborDisabledOptions: HarborOptions[] = ['Moor'];

export default function Harbor() {
  const { selectOption, back, next, state } = useBuildingState<HarborOptions>();

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

  let children: ReactNode;

  if (option === 'Supply') {
    vendorMessage = null;
    children = <HarborSupply back={back} />;
  }

  const menu = (
    <Menu
      options={harborOptions.map((s) => ({
        label: s,
        value: s,
        disabled: harborDisabledOptions.includes(s),
      }))}
      setSelected={(s) => {
        selectOption(s);
      }}
      hidden={option !== null}
    />
  );

  return (
    <BuildingWrapper
      buildingId="4"
      vendorMessageBox={vendorMessage}
      menu={menu}
      back={back}
      backActive={state.option === null}
      next={next}
    >
      {children}
    </BuildingWrapper>
  );
}
