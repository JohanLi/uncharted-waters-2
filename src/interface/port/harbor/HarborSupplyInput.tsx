/* eslint-disable jsx-a11y/no-autofocus */

import React from 'react';

import MessageBox from '../../common/MessageBox';
import { Provisions } from '../../../world/fleets';
import { getAvailableSpace } from '../../../state/selectorsFleet';
import { provisionCost, supplyShip } from '../../../state/actionsPort';
import InputNumber from '../../common/InputNumber';

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

  const availableSpace = getAvailableSpace(shipNumber);

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
          <InputNumber
            limit={availableSpace}
            onComplete={(quantity) => {
              supplyShip(shipNumber, provision, quantity);
              onComplete();
            }}
            onCancel={onCancel}
            inlined
          />
        </div>
      </MessageBox>
    </div>
  );
}
