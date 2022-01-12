import React from 'react';

import { useAppSelector } from '../hooks';
import { markets } from '../../port/portMetadata';
import { getPortMetadata } from '../../port/portUtils';

// TODO Investments
export default function PortInfo() {
  const { portId } = useAppSelector((state) => state.interface);

  const port = getPortMetadata(portId);

  let economy = 0;
  let industry = 0;
  let economyId;
  let territory = 'Supply port';

  if (!port.isSupplyPort) {
    ({ economy, industry, economyId } = port);
    territory = markets[economyId];
  }

  const { name } = port;

  return (
    <>
      <div className="text-2xl font-bold whitespace-nowrap">{name}</div>
      <div className="mb-20">{territory}</div>
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
    </>
  );
}
