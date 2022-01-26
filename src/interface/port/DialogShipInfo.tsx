import React from 'react';

import Assets from '../../assets';
import { shipData } from '../../data/shipData';

interface Props {
  shipId: string;
}

export default function DialogShipInfo({ shipId }: Props) {
  const {
    name,
    durability,
    tacking,
    power,
    capacity,
    usedGuns,
    maximumGuns,
    minimumCrew,
    usedCrew,
    maximumCrew,
  } = shipData[shipId];

  const cargo = capacity - usedGuns - usedCrew;

  return (
    <div
      className="absolute top-[256px] w-[736px] h-[304px]"
      style={{
        background: `url('${Assets.images.dialogShip.toDataURL()}')`,
        backgroundSize: '736px 304px',
      }}
    >
      <div className="flex items-center h-full px-8">
        <img
          src={Assets.ships(shipId)}
          className="w-[256px] h-[192px]"
          alt=""
        />
        <div className="flex-1 pl-8">
          <div className="text-2xl text-blue-600 text-center mb-4">{name}</div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-1">
            <div className="col-span-1 flex items-end justify-between">
              <div>Durability</div>
              <div className="text-2xl">{durability}</div>
            </div>
            <div className="col-start-1 col-span-1 flex items-end justify-between">
              <span>Tacking</span>
              <span className="text-2xl">{tacking}</span>
            </div>
            <div className="col-span-1 flex items-end justify-between">
              <span>Power</span>
              <span className="text-2xl">{power}</span>
            </div>
            <div className="col-span-1 flex items-end justify-between">
              <span>Capacity</span>
              <span className="text-2xl">{capacity}</span>
            </div>
            <div className="col-span-1 flex items-end justify-between">
              <span>Cargo</span>
              <span className="text-2xl">{cargo}</span>
            </div>
            <div className="col-span-2 flex items-end justify-between">
              <span>Guns (Max/Remodel)</span>
              <span className="text-2xl">
                {usedGuns}/{maximumGuns}
              </span>
            </div>
            <div className="col-span-2 flex items-end justify-between">
              <span>Crew (Min/Max)</span>
              <span className="text-2xl">
                {minimumCrew}/{usedCrew}
              </span>
            </div>
            <div className="col-span-2 flex items-end justify-between">
              <span>Max Crew (Remodel)</span>
              <span className="text-2xl">{maximumCrew}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
