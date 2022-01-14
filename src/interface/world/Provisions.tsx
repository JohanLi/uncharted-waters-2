import React, { useState } from 'react';

import Assets from '../../assets';
import type { ProvisionsType } from '../../state/state';
import { classNames } from '../interfaceUtils';
import updateInterface from '../../state/updateInterface';

const provisionClass = 'flex items-center py-2';
const quantityClass = 'flex-1 text-right text-xl';

interface Props {
  hidden: boolean;
}

export default function Provisions({ hidden }: Props) {
  const [provisions, setProvisions] = useState<ProvisionsType>({
    water: 0,
    food: 0,
    lumber: 0,
    shot: 0,
  });

  updateInterface.provisions = (p) => {
    setProvisions(p);
  };

  const { water, food, lumber, shot } = provisions;

  return (
    <div className={classNames('mt-20', hidden ? 'hidden' : '')}>
      <div className="text-sm mb-4">Provisions</div>
      <div className={provisionClass}>
        <img
          src={Assets.images.worldWater.toDataURL()}
          alt="Water"
          className="w-8 h-16"
        />
        <div className={quantityClass}>{water}</div>
      </div>
      <div className={provisionClass}>
        <img
          src={Assets.images.worldFood.toDataURL()}
          alt="food"
          className="w-8 h-16"
        />
        <div className={quantityClass}>{food}</div>
      </div>
      <div className={provisionClass}>
        <img
          src={Assets.images.worldLumber.toDataURL()}
          alt="Lumber"
          className="w-8 h-16"
        />
        <div className={quantityClass}>{lumber}</div>
      </div>
      <div className={provisionClass}>
        <img
          src={Assets.images.worldShot.toDataURL()}
          alt="Shot"
          className="w-8 h-16"
        />
        <div className={quantityClass}>{shot}</div>
      </div>
    </div>
  );
}
