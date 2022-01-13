import React, { ReactNode, useState } from 'react';

import {
  getCoins,
  getDate,
  getHoursMinutes,
  getIngots,
  hudClass,
} from './interfaceUtils';
import updateInterface from './updateInterface';

interface Props {
  inPort: boolean;
  timePassed: number;
  gold: number;
  children?: ReactNode;
}

export default function Left({ inPort, timePassed, gold, children }: Props) {
  const [dayAtSea, setDayAtSea] = useState(0);

  updateInterface.dayAtSea = (d) => {
    setDayAtSea(d);
  };

  return (
    <div className={hudClass} style={{ left: '-180px', width: '180px' }}>
      <div className="text-2xl font-bold whitespace-nowrap">
        {getDate(timePassed)}
      </div>
      <div className="mb-20">
        {inPort ? getHoursMinutes(timePassed) : `Day ${dayAtSea}`}
      </div>
      <div className="text-sm">Ingots</div>
      <div className="mb-4 text-right text-xl">{getIngots(gold)}</div>
      <div className="text-sm">Coins</div>
      <div className="mb-4 text-right text-xl">{getCoins(gold)}</div>
      {Boolean(children) && <div>{children}</div>}
    </div>
  );
}

Left.defaultProps = {
  children: null,
};
