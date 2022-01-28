import React, { useEffect, useState } from 'react';

import DialogBox from '../common/DialogBox';
import Menu from '../common/Menu';
import { setSail } from '../../state/actionsWorld';
import { provisions } from '../../world/fleets';
import ProgressBar from '../common/ProgressBar';
import HarborSupply, { SupplyProvision } from './HarborSupply';
import { getLoadPercent, getPlayerFleet } from '../../state/selectorsFleet';
import BuildingWrapper, { VendorMessage } from './BuildingWrapper';
import useBuildingState from './hooks/useBuildingState';

const harborOptions = ['Sail', 'Supply', 'Moor'] as const;
type HarborOptions = typeof harborOptions[number];

const harborDisabledOptions: HarborOptions[] = ['Moor'];

export default function Harbor() {
  const { selectOption, back, next, state } = useBuildingState<HarborOptions>();

  const [supplyProvision, setSupplyProvision] = useState<
    SupplyProvision | undefined
  >();

  useEffect(() => {
    const { option, step } = state;

    if (option === 'Sail' && step === 0) {
      setSail();
    }

    if (option === 'Supply' && step >= 2) {
      setSupplyProvision(undefined);
      back(2);
    }
  }, [state]);

  const { option, step } = state;

  let vendorMessage: VendorMessage = {
    body: 'Ahoy there, matey, will ye be shoving off?',
    showCaretDown: false,
  };

  if (option === 'Supply') {
    vendorMessage = null;
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
    <BuildingWrapper buildingId="4" vendorMessage={vendorMessage} menu={menu}>
      {option === 'Supply' && step >= 0 && (
        <div className="absolute top-[256px] left-[16px]">
          <DialogBox className="px-8 py-6">
            <div className="flex items-center">
              <div className="w-64 text-green-600">Ship</div>
              <div className="w-24 text-[#d34100]">Load</div>
              <div className="w-24 text-blue-600 text-right">Water</div>
              <div className="w-24 text-blue-600 text-right">Food</div>
              <div className="w-24 text-blue-600 text-right">Lumber</div>
              <div className="w-24 text-blue-600 text-right">Shot</div>
            </div>
            {getPlayerFleet().map((ship, i) => (
              // TODO give ships an ID; current key isn’t fool-proof
              <div
                className="flex items-center mt-2"
                key={`${ship.id}-${ship.name}`}
              >
                <div className="w-64 text-2xl">{ship.name}</div>
                <div className="w-24">
                  <ProgressBar percent={getLoadPercent(i)} />
                </div>
                {provisions.map((provision) => {
                  const { quantity = 0 } =
                    ship.cargo.find((items) => items.type === provision) || {};

                  return (
                    <div
                      className="w-24 text-2xl text-right cursor-pointer"
                      onClick={() => {
                        setSupplyProvision({ shipNumber: i, provision });

                        if (supplyProvision === undefined) {
                          next();
                        }
                      }}
                      key={provision}
                    >
                      {quantity}
                    </div>
                  );
                })}
              </div>
            ))}
          </DialogBox>
        </div>
      )}
      {option === 'Supply' && step === 1 && supplyProvision !== undefined && (
        <div className="absolute bottom-[16px] right-[304px]">
          <HarborSupply supplyProvision={supplyProvision} selected={next} />
        </div>
      )}
    </BuildingWrapper>
  );
}
