// TODO
/* eslint-disable react/no-array-index-key */

import React, { useMemo } from 'react';
import Assets from '../assets';
import { TILE_SIZE } from '../constants';
import { Position } from '../types';
import { getPlayerFleet } from '../state/selectorsFleet';
import MessageBox from './common/MessageBox';

const positions: Position[] = [
  { x: 512, y: 320 },
  { x: 768, y: 128 },
  { x: 256, y: 128 },
];

// number arrived at through visual inspection
const TILESET_OFFSET = 27;

export default function Fleet() {
  const backgroundImage = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = TILE_SIZE;
    canvas.height = TILE_SIZE;

    const context = canvas.getContext('2d', { alpha: false })!;

    context.drawImage(
      Assets.images('worldTileset'),
      0,
      TILE_SIZE * TILESET_OFFSET,
      TILE_SIZE,
      TILE_SIZE,
      0,
      0,
      TILE_SIZE,
      TILE_SIZE,
    );

    return canvas.toDataURL();
  }, []);

  return (
    <MessageBox>
      <div
        className="w-[1280px] h-[608px]"
        style={{ background: `url('${backgroundImage}')` }}
      >
        {getPlayerFleet().map((ship, i) => (
          <img
            src={Assets.ships(ship.id)}
            alt=""
            className="absolute w-64 h-48"
            style={{ top: `${positions[i].y}px`, left: `${positions[i].x}px` }}
            key={i}
          />
        ))}
      </div>
    </MessageBox>
  );
}
