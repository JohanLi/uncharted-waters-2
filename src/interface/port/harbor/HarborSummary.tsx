import React from 'react';
import MessageBox from '../../common/MessageBox';
import { getLoadPercent, getPlayerFleet } from '../../../state/selectorsFleet';
import ProgressBar from '../../common/ProgressBar';
import { provisions } from '../../../game/world/fleets';

export default function HarborSummary() {
  return (
    <div
        className="absolute top-[48px] left-[16px]"
        data-test="harborSummary"
      >
        <MessageBox>
          <div className="px-4 py-2">
            <div className="flex items-center">
              <div className="w-64 text-green-600">Ship</div>
              <div className="w-36 text-purple-600 text-right pr-12">Crew</div>
              <div className="w-24 text-[#d34100]">Load</div>
              <div className="w-24 text-blue-600 text-right">Water</div>
              <div className="w-24 text-blue-600 text-right">Food</div>
            </div>
            {getPlayerFleet().map((ship, i) => {
              const loadPercent = getLoadPercent(i);

              return (
                // TODO give ships an ID; current key isn’t fool-proof
                <div
                  className="flex items-center mt-2"
                  key={`${ship.id}-${ship.name}`}
                >
                  <div className="w-64 text-2xl">{ship.name}</div>
                  <div className="w-36 text-2xl text-right pr-12">
                    {ship.crew}
                  </div>
                  <div className="w-24">
                    <ProgressBar percent={loadPercent} />
                  </div>
                  {provisions.slice(0, 2).map((provision) => {
                    const { quantity = 0 } =
                      ship.cargo.find((items) => items.type === provision) ||
                      {};

                    return (
                      <div className="w-24 text-2xl text-right" key={provision}>
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
  );
}
