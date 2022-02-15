import React, { ReactNode, useState } from 'react';

import {
  classNames,
  getCoins,
  getDate,
  getHoursMinutes,
  getIngots,
  hudClass,
} from './interfaceUtils';
import updateInterface from '../state/updateInterface';
import Sound from './sound/Sound';
import Fleet from './Fleet';
import Popover from './common/Popover';

interface Props {
  portId: string | null;
  buildingId: string | null;
  timePassed: number;
  gold: number;
  children?: ReactNode;
}

export default function Left({
  portId,
  buildingId,
  timePassed,
  gold,
  children = null,
}: Props) {
  const [dayAtSea, setDayAtSea] = useState(0);

  updateInterface.dayAtSea = (d) => {
    setDayAtSea(d);
  };

  const inPort = portId !== null;

  return (
    <div
      className={classNames(hudClass, 'flex flex-col justify-between')}
      data-test="left"
    >
      <div className="p-5">
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
      {inPort && (
        <div className="select-none">
          <Popover label="View fleet">
            <Fleet />
          </Popover>
        </div>
      )}
      <div className="p-5 text-right">
        <Sound portId={portId} buildingId={buildingId} />
      </div>
    </div>
  );
}
