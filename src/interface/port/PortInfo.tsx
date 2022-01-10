import React from 'react';

import { useAppSelector } from '../hooks';
import { markets, ports } from '../../port/metadata';

export default function PortInfo() {
  const { portId } = useAppSelector((state) => state.interface);

  const { name, economy, industry, economyId } = ports[portId];
  const territory = markets[economyId];

  return (
    <>
      <div className="text-2xl font-bold whitespace-nowrap">{name}</div>
      <div className="mb-20">{territory}</div>
      <div className="text-sm">Economy</div>
      <div className="mb-4 text-right text-xl">{economy}</div>
      <div className="text-sm">Investment</div>
      <div className="mb-4 text-right text-xl">0</div>
      <div className="text-sm">Industry</div>
      <div className="mb-4 text-right text-xl">{industry}</div>
      <div className="text-sm">Investment</div>
      <div className="mb-4 text-right text-xl">0</div>
      <div className="text-sm">Price Index</div>
      <div className="mb-4 text-right text-xl">100%</div>
    </>
  );
}
