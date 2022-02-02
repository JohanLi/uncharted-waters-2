import React, { ChangeEvent, useState } from 'react';

import MessageBox from '../common/MessageBox';
import { Provisions } from '../../world/fleets';
import { getAvailableSpace } from '../../state/selectorsFleet';
import { provisionCost, supplyShipNumber } from '../../state/actionsPort';

export type SupplyProvision = {
  shipNumber: number;
  provision: Provisions;
};

interface Props {
  supplyProvision: SupplyProvision;
  selected: () => void;
}

export default function HarborSupply({ supplyProvision, selected }: Props) {
  const { shipNumber, provision } = supplyProvision;
  const [provisionQuantity, setProvisionQuantity] = useState(0);

  const availableSpace = getAvailableSpace(shipNumber);

  return (
    <MessageBox>
      <div className="w-[400px] text-2xl px-4 py-2">
        {provision === 'water' &&
          'Water is free. How many barrels should we load?'}
        {provision === 'food' &&
          `Food will cost us ${provisionCost[provision]} gold pieces per barrel. How many barrels will we buy?`}
        {provision === 'lumber' &&
          `Lumber will cost us ${provisionCost[provision]} gold pieces per plank. How many planks will we buy?`}
        {provision === 'shot' &&
          `Cannonballs will cost us ${provisionCost[provision]} gold pieces per barrel. How many barrels will we buy?`}
        <div>(0-{availableSpace})</div>
        <div>
          <input
            type="text"
            value={provisionQuantity || ''}
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
            onClick={() => {
              setProvisionQuantity(0);
            }}
          />
          <button
            type="button"
            onClick={() => {
              supplyShipNumber(shipNumber, provision, provisionQuantity);
              selected();
            }}
          >
            Ok
          </button>
        </div>
      </div>
    </MessageBox>
  );
}
