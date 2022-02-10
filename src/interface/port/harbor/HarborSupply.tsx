/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { useState } from 'react';
import MessageBox from '../../common/MessageBox';
import { getLoadPercent, getPlayerFleet } from '../../../state/selectorsFleet';
import ProgressBar from '../../common/ProgressBar';
import { provisions } from '../../../game/world/fleets';
import HarborSupplyInput, { ShipProvision } from './HarborSupplyInput';
import { classNames } from '../../interfaceUtils';
import useCancel from '../hooks/useCancel';

interface Props {
  back: () => void;
}

export default function HarborSupply({ back }: Props) {
  const [shipProvision, setShipProvision] = useState<ShipProvision>();

  useCancel(shipProvision === undefined ? back : undefined);

  return (
    <>
      <div className="absolute top-[48px] left-[16px]" data-test="harborSupply">
        <MessageBox>
          <div className="px-4 py-2">
            <div className="flex items-center">
              <div className="w-64 text-green-600">Ship</div>
              <div className="w-24 text-[#d34100]">Load</div>
              <div className="w-24 text-blue-600 text-right">Water</div>
              <div className="w-24 text-blue-600 text-right">Food</div>
              <div className="w-24 text-blue-600 text-right">Lumber</div>
              <div className="w-24 text-blue-600 text-right">Shot</div>
            </div>
            {getPlayerFleet().map((ship, i) => {
              const loadPercent = getLoadPercent(i);
              const full = loadPercent === 100;

              return (
                // TODO give ships an ID; current key isn’t fool-proof
                <div
                  className="flex items-center mt-2"
                  key={`${ship.id}-${ship.name}`}
                >
                  <div className="w-64 text-2xl">{ship.name}</div>
                  <div className="w-24">
                    <ProgressBar percent={loadPercent} />
                  </div>
                  {provisions.map((provision) => {
                    const { quantity = 0 } =
                      ship.cargo.find((items) => items.type === provision) ||
                      {};

                    return (
                      <div
                        className={classNames(
                          'w-24 text-2xl text-right',
                          !full ? 'cursor-pointer' : '',
                        )}
                        onClick={() =>
                          !full &&
                          setShipProvision({ shipNumber: i, provision })
                        }
                        key={provision}
                      >
                        {quantity}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </MessageBox>
      </div>
      {!!shipProvision && (
        <HarborSupplyInput
          shipProvision={shipProvision}
          onComplete={() => setShipProvision(undefined)}
          onCancel={() => setShipProvision(undefined)}
        />
      )}
    </>
  );
}
