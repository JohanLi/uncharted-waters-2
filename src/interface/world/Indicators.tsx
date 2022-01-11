import React from 'react';

import Assets from '../../assets';
import { useAppSelector } from '../hooks';

const indicatorClass = 'flex items-center';
const speedClass = 'flex-1 text-right text-4xl';

export default function Indicators() {
  const {
    indicators: { wind, current, direction },
  } = useAppSelector((state) => state.interface);

  return (
    <div className="h-full flex items-center">
      <div className="w-full space-y-8">
        <div>
          <div className="text-sm mb-4">Wind</div>
          <div className={indicatorClass}>
            <img
              src={Assets.indicators(
                wind.speed ? wind.direction : 8,
              ).toDataURL()}
              alt=""
            />
            <div className={speedClass}>{wind.speed}</div>
          </div>
        </div>
        <div>
          <div className="text-sm mb-4">Current</div>
          <div className={indicatorClass}>
            <img
              src={Assets.indicators(
                current.speed ? current.direction : 8,
              ).toDataURL()}
              alt=""
            />
            <div className={speedClass}>{current.speed}</div>
          </div>
        </div>
        <div>
          <div className="text-sm mb-4">Direction</div>
          <div className={indicatorClass}>
            <img
              src={Assets.indicators(
                direction.speed ? direction.direction : 8,
              ).toDataURL()}
              alt=""
            />
            <div className={speedClass}>{direction.speed}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
