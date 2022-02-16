import Assets from './assets';
import { Position } from './types';
import { PortData } from './game/port/portUtils';
import { WORLD_MAP_COLUMNS } from './constants';
import { getXWrapAround } from './game/world/sharedUtils';
import { CollisionIndices, tilesets } from './data/portExtraData';
import { applyPositionDelta, getPositionDelta } from './utils';

interface Cache {
  [tilesetOffset: string]: CachedCanvas;
}

interface CachedCanvas {
  context: CanvasRenderingContext2D;
  position: Position;
}

interface Options {
  position: Position;
  offsetFrom?: Position;
  offsetTo?: Position;
  tilesetOffset: number;
}

const createMap = (visibleArea: [number, number], portData?: PortData) => {
  const tileSize = 32;
  const cache = <Cache>{};

  let tilemap: Uint8Array;
  let tilemapColumns: number;
  let tilemapRows: number;
  let tileset: HTMLCanvasElement;
  let getTilesetOffset: (time: number) => number;
  let collisionIndices: CollisionIndices;

  if (portData) {
    tilemapColumns = 96;
    tilemapRows = 96;
    tilemap = Assets.data('portTilemaps').slice(
      portData.tilemap * tilemapColumns * tilemapRows,
      (portData.tilemap + 1) * tilemapColumns * tilemapRows,
    );
    tileset = Assets.images('portTilesets');
    collisionIndices = tilesets[portData.tileset].collisionIndices;

    getTilesetOffset = (time: number) => {
      let timeOffset: number;

      if (time >= 240 && time < 480) {
        timeOffset = 0;
      } else if (time >= 480 && time < 960) {
        timeOffset = 1;
      } else if (time >= 960 && time < 1200) {
        timeOffset = 2;
      } else {
        timeOffset = 3;
      }

      return timeOffset + portData.tileset * 4;
    };
  } else {
    tilemapColumns = WORLD_MAP_COLUMNS;
    tilemapRows = 1080;
    tilemap = Assets.data('worldTilemap');
    tileset = Assets.images('worldTileset');

    getTilesetOffset = (time: number) => {
      let timeOffset: number;

      if (time >= 480 && time < 960) {
        // 08 to 16
        timeOffset = 0;

        if (time >= 840) {
          timeOffset += (time - 840) / (120 / 6);
        }
      } else if (time >= 960 && time < 1200) {
        // 16 to 20
        timeOffset = 6;

        if (time >= 1080) {
          timeOffset += (time - 1080) / (120 / 10);
        }
      } else if (time >= 1200 || time < 240) {
        // 20 to 04
        timeOffset = 16;

        if (time >= 120 && time < 240) {
          timeOffset += (time - 120) / (120 / 6);
        }
      } else {
        // 04 to 08
        timeOffset = 22;

        if (time >= 360) {
          timeOffset += (time - 360) / (120 / 9);
        }
      }

      return Math.floor(timeOffset);
    };
  }

  const tiles = ({ x, y }: Position) =>
    tilemap[y * tilemapColumns + getXWrapAround(x)] || 0;

  const drawImage = (context: CanvasRenderingContext2D, options: Options) => {
    const {
      position,
      offsetFrom = { x: 0, y: 0 },
      offsetTo = { x: visibleArea[0], y: visibleArea[1] },
      tilesetOffset,
    } = options;

    for (let yOffset = offsetFrom.y; yOffset < offsetTo.y; yOffset += 1) {
      for (let xOffset = offsetFrom.x; xOffset < offsetTo.x; xOffset += 1) {
        const tile = tiles({
          x: position.x + xOffset,
          y: position.y + yOffset,
        });

        context.drawImage(
          tileset,
          tile * tileSize,
          tilesetOffset * tileSize,
          tileSize,
          tileSize,
          xOffset * tileSize,
          yOffset * tileSize,
          tileSize,
          tileSize,
        );
      }
    }
  };

  const outOfBoundsAt = (position: Position): boolean => {
    const { x, y } = position;

    if (y < 0 || y + 1 >= tilemapRows) {
      return true;
    }

    if (!portData) {
      return false;
    }

    return x < 0 || x + 1 >= tilemapColumns;
  };

  return {
    draw: (position: Position, time: number): HTMLCanvasElement => {
      if (position.x < 0 || position.y < 0) {
        throw Error('Out of bounds');
      }

      const tilesetOffset = getTilesetOffset(time);

      if (!cache[tilesetOffset]) {
        const canvas = document.createElement('canvas');
        canvas.width = visibleArea[0] * tileSize;
        canvas.height = visibleArea[1] * tileSize;

        const context = canvas.getContext('2d', { alpha: false })!;

        drawImage(context, { position, tilesetOffset });

        cache[tilesetOffset] = {
          context,
          position,
        };

        return canvas;
      }

      const delta = getPositionDelta(position, cache[tilesetOffset].position);

      if (delta.x === 0 && delta.y === 0) {
        return cache[tilesetOffset].context.canvas;
      }

      if (
        Math.abs(delta.x) >= visibleArea[0] ||
        Math.abs(delta.y) >= visibleArea[1]
      ) {
        drawImage(cache[tilesetOffset].context, { position, tilesetOffset });

        cache[tilesetOffset].position = position;
        return cache[tilesetOffset].context.canvas;
      }

      const from = {
        x: 0,
        y: 0,
      };

      if (delta.x < 0) {
        from.x = -delta.x;
      }

      if (delta.y < 0) {
        from.y = -delta.y;
      }

      const to = {
        x: visibleArea[0] - Math.abs(delta.x),
        y: visibleArea[1] - Math.abs(delta.y),
      };

      cache[tilesetOffset].context.drawImage(
        cache[tilesetOffset].context.canvas,
        (from.x + delta.x) * tileSize,
        (from.y + delta.y) * tileSize,
        to.x * tileSize,
        to.y * tileSize,
        from.x * tileSize,
        from.y * tileSize,
        to.x * tileSize,
        to.y * tileSize,
      );

      if (delta.x !== 0) {
        const offsetFrom = {
          x: visibleArea[0] - delta.x,
          y: 0,
        };

        if (delta.x < 0) {
          offsetFrom.x = 0;
        }

        const offsetTo = {
          x: offsetFrom.x + Math.abs(delta.x),
          y: visibleArea[1],
        };

        drawImage(cache[tilesetOffset].context, {
          position,
          offsetFrom,
          offsetTo,
          tilesetOffset,
        });
      }

      if (delta.y !== 0) {
        const offsetFrom = {
          x: 0,
          y: visibleArea[1] - delta.y,
        };

        if (delta.x < 0) {
          offsetFrom.x = -delta.x;
        }

        if (delta.y < 0) {
          offsetFrom.y = 0;
        }

        const offsetTo = applyPositionDelta(offsetFrom, {
          x: visibleArea[0] - Math.abs(delta.x),
          y: Math.abs(delta.y),
        });

        drawImage(cache[tilesetOffset].context, {
          position,
          offsetFrom,
          offsetTo,
          tilesetOffset,
        });
      }

      cache[tilesetOffset].position = position;

      return cache[tilesetOffset].context.canvas;
    },
    collisionAt: (position: Position): boolean => {
      if (outOfBoundsAt(position)) {
        return true;
      }

      const offsetsToCheck = [
        { x: 0, y: 1 },
        { x: 1, y: 1 },
      ];

      if (portData) {
        return offsetsToCheck.some((offset, i) => {
          const tile = tiles(applyPositionDelta(position, offset));

          if (tile >= collisionIndices.either) {
            return true;
          }

          if (i === 0) {
            return tile >= collisionIndices.left;
          }

          return tile >= collisionIndices.right && tile < collisionIndices.left;
        });
      }

      offsetsToCheck.push({ x: 0, y: 0 }, { x: 1, y: 0 });

      return offsetsToCheck.some((offset) => {
        const tile = tiles(applyPositionDelta(position, offset));
        return tile >= 50;
      });
    },
    tilemapColumns,
    tilemapRows,
  };
};

export type Map = ReturnType<typeof createMap>;

export default createMap;
