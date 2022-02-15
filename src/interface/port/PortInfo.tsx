import React from 'react';

import {
  getRegionOrIfSupplyPort,
  getPortData,
} from '../../game/port/portUtils';

interface Props {
  portId: string;
}

// TODO Investments
export default function PortInfo({ portId }: Props) {
  const port = getPortData(portId);

  let economy = 0;
  let industry = 0;

  if (!port.isSupplyPort) {
    ({ economy, industry } = port);
  }

  const { name } = port;

  return (
    <div className="p-5">
      <div className="text-2xl font-bold whitespace-nowrap">{name}</div>
      <div className="mb-20">{getRegionOrIfSupplyPort(portId)}</div>
      <div className="text-sm">Economy</div>
      <div className="mb-4 text-right text-xl">{economy}</div>
      <div className="text-sm">Investment</div>
      <div className="mb-4 text-right text-xl">{economy}</div>
      <div className="text-sm">Industry</div>
      <div className="mb-4 text-right text-xl">{industry}</div>
      <div className="text-sm">Investment</div>
      <div className="mb-4 text-right text-xl">{industry}</div>
      <div className="text-sm">Price Index</div>
      <div className="mb-4 text-right text-xl">100%</div>
    </div>
  );
}
