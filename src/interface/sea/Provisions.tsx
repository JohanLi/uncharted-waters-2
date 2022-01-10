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
        <img src={Assets.images.seaWater.toDataURL()} alt="Water" />
        <div className={quantityClass}>{water}</div>
      </div>
      <div className={provisionClass}>
        <img src={Assets.images.seaFood.toDataURL()} alt="food" />
        <div className={quantityClass}>{food}</div>
      </div>
      <div className={provisionClass}>
        <img src={Assets.images.seaLumber.toDataURL()} alt="Lumber" />
        <div className={quantityClass}>{lumber}</div>
      </div>
      <div className={provisionClass}>
        <img src={Assets.images.seaShot.toDataURL()} alt="Shot" />
        <div className={quantityClass}>{shot}</div>
      </div>
    </div>
  );
}
