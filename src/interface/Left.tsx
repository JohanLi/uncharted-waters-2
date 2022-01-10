import React, { ReactNode } from 'react';

import { useAppSelector } from './hooks';
import {
  getCoins,
  getDate,
  getHoursMinutes,
  getIngots,
} from './interfaceSlice';
import { hudClass } from './interfaceUtils';

interface Props {
  children?: ReactNode;
}

export default function Left({ children }: Props) {
  const { portId, dayAtSea } = useAppSelector((state) => state.interface);

  const hoursMinutes = useAppSelector(getHoursMinutes);

  return (
    <div className={hudClass} style={{ left: '-180px', width: '180px' }}>
      <div className="text-2xl font-bold whitespace-nowrap">
        {useAppSelector(getDate)}
      </div>
      <div className="mb-20">{portId ? hoursMinutes : `Day ${dayAtSea}`}</div>
      <div className="text-sm">Ingots</div>
      <div className="mb-4 text-right text-xl">{useAppSelector(getIngots)}</div>
      <div className="text-sm">Coins</div>
      <div className="mb-4 text-right text-xl">{useAppSelector(getCoins)}</div>
      {Boolean(children) && <div>{children}</div>}
    </div>
  );
}

Left.defaultProps = {
  children: null,
};
