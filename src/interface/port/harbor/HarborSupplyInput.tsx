/* eslint-disable jsx-a11y/no-autofocus */

import React, { ChangeEvent, FormEvent, useState } from 'react';

import MessageBox from '../../common/MessageBox';
import { Provisions } from '../../../world/fleets';
import { getAvailableSpace } from '../../../state/selectorsFleet';
import { provisionCost, supplyShip } from '../../../state/actionsPort';
import Assets from '../../../assets';
import { classNames } from '../../interfaceUtils';
import useCancel from '../hooks/useCancel';

export type ShipProvision = {
  shipNumber: number;
  provision: Provisions;
};

interface Props {
  shipProvision: ShipProvision;
  onComplete: () => void;
  onCancel: () => void;
}

export default function HarborSupplyInput({
  shipProvision,
  onComplete,
  onCancel,
}: Props) {
  const { shipNumber, provision } = shipProvision;
  const [provisionQuantity, setProvisionQuantity] = useState(0);

  const availableSpace = getAvailableSpace(shipNumber);

  useCancel(onCancel);

  return (
    <div className="absolute bottom-[80px] left-[80px]">
      <MessageBox>
        <div className="w-[400px] px-4 py-2 text-2xl">
          {provision === 'water' &&
            'Water is free. How many barrels should we load?'}
          {provision === 'food' &&
            `Food will cost us ${provisionCost[provision]} gold pieces per barrel. How many barrels will we buy?`}
          {provision === 'lumber' &&
            `Lumber will cost us ${provisionCost[provision]} gold pieces per plank. How many planks will we buy?`}
          {provision === 'shot' &&
            `Cannonballs will cost us ${provisionCost[provision]} gold pieces per barrel. How many barrels will we buy?`}{' '}
          <form
            className="flex items-end justify-end mt-4"
            onSubmit={(e: FormEvent) => {
              e.preventDefault();
              supplyShip(shipNumber, provision, provisionQuantity);
              onComplete();
            }}
          >
            <div className="pr-4">
              <input
                className={classNames(
                  'w-36 px-4 py-2',
                  'border-2 border-[#d34100]',
                  'focus:outline-none focus:ring-4 focus:ring-[#f3a261]',
                )}
                type="text"
                required
                value={provisionQuantity || ''}
                placeholder={`0-${availableSpace}`}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const { value } = e.target;

                  if (Number.isNaN(value)) {
                    return;
                  }

                  let quantity = Number(value);
                  quantity = Math.max(0, quantity);
                  quantity = Math.min(availableSpace, quantity);

                  setProvisionQuantity(quantity);
                }}
                onClick={() => setProvisionQuantity(0)}
                autoFocus
              />
            </div>
            <button type="submit">
              <img
                src={Assets.images.dialogSubmit.toDataURL()}
                alt=""
                className="w-[92px] h-[44px]"
              />
            </button>
          </form>
        </div>
      </MessageBox>
    </div>
  );
}
