import React from 'react';

import Assets from '../../assets';
import { useAppSelector } from '../hooks';

const provisionClass = 'flex items-center py-2';
const quantityClass = 'flex-1 text-right text-xl';

export default function Provisions() {
  const { water, food, lumber, shot } = useAppSelector(
    (state) => state.interface,
  );

  return (
    <div className="mt-20">
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
