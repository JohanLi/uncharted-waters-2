import Assets from './assets';
import { tilesets, CollisionIndices } from './port/portMetadata';
import { Position } from './types';
import { PortMetadata } from './port/portUtils';
import { WORLD_MAP_COLUMNS } from './constants';
import { getXWrapAround } from './world/sharedUtils';

interface Cache {
  [tilesetOffset: string]: CachedCanvas;
}

interface CachedCanvas {
  context: CanvasRenderingContext2D;
  x: number;
  y: number;
}

interface Options {
  x: number;
  y: number;
  xOffsetFrom?: number;
  xOffsetTo?: number;
  yOffsetFrom?: number;
  yOffsetTo?: number;
  tilesetOffset: number;
}

const createMap = (
  visibleArea: [number, number],
  portMetadata?: PortMetadata,
) => {
  const tileSize = 32;
  const cache = <Cache>{};

  let tilemap: Uint8Array;
  let tilemapColumns: number;
  let tilemapRows: number;
  let tileset: HTMLCanvasElement;
  let getTilesetOffset: (time: number) => number;
  let collisionIndices: CollisionIndices;

  if (portMetadata) {
    tilemapColumns = 96;
    tilemapRows = 96;
    tilemap = Assets.data.portTilemaps.slice(
      portMetadata.tilemap * tilemapColumns * tilemapRows,
      (portMetadata.tilemap + 1) * tilemapColumns * tilemapRows,
    );
    tileset = Assets.images.portTilesets;
    collisionIndices = tilesets[portMetadata.tileset].collisionIndices;

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

      return timeOffset + portMetadata.tileset * 4;
    };
  } else {
    tilemapColumns = WORLD_MAP_COLUMNS;
    tilemapRows = 1080;
    tilemap = Assets.data.worldTilemap;
    tileset = Assets.images.worldTileset;

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

  const tiles = (x: number, y: number): number =>
    tilemap[y * tilemapColumns + getXWrapAround(x)] || 0;

  const drawImage = (context: CanvasRenderingContext2D, options: Options) => {
    const {
      x,
      y,
      xOffsetFrom = 0,
      xOffsetTo = visibleArea[0],
      yOffsetFrom = 0,
      yOffsetTo = visibleArea[1],
      tilesetOffset,
    } = options;

    for (let yOffset = yOffsetFrom; yOffset < yOffsetTo; yOffset += 1) {
      for (let xOffset = xOffsetFrom; xOffset < xOffsetTo; xOffset += 1) {
        const tile = tiles(x + xOffset, y + yOffset);
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

    if (!portMetadata) {
      return false;
    }

    return x < 0 || x + 1 >= tilemapColumns;
  };

  return {
    draw: (x: number, y: number, time: number): HTMLCanvasElement => {
      if (x < 0 || y < 0) {
        throw Error('Out of bounds');
      }

      // TODO reimplement this together with unit tests
      // if (x > tilemapColumns - visibleArea[0] || y > tilemapRows - visibleArea[1]) {
      //   throw Error('Out of bounds');
      // }

      const tilesetOffset = getTilesetOffset(time);

      if (!cache[tilesetOffset]) {
        const canvas = document.createElement('canvas');
        canvas.width = visibleArea[0] * tileSize;
        canvas.height = visibleArea[1] * tileSize;

        const context = canvas.getContext('2d', { alpha: false })!;

        drawImage(context, { x, y, tilesetOffset });

        cache[tilesetOffset] = {
          context,
          x,
          y,
        };

        return canvas;
      }

      const xDiff = x - cache[tilesetOffset].x;
      const yDiff = y - cache[tilesetOffset].y;

      if (xDiff === 0 && yDiff === 0) {
        return cache[tilesetOffset].context.canvas;
      }

      if (
        Math.abs(xDiff) >= visibleArea[0] ||
        Math.abs(yDiff) >= visibleArea[1]
      ) {
        drawImage(cache[tilesetOffset].context, { x, y, tilesetOffset });

        cache[tilesetOffset].x = x;
        cache[tilesetOffset].y = y;
        return cache[tilesetOffset].context.canvas;
      }

      let xFrom = 0;
      let yFrom = 0;

      if (xDiff < 0) {
        xFrom = -xDiff;
      }

      if (yDiff < 0) {
        yFrom = -yDiff;
      }

      const xTo = visibleArea[0] - Math.abs(xDiff);
      const yTo = visibleArea[1] - Math.abs(yDiff);

      cache[tilesetOffset].context.drawImage(
        cache[tilesetOffset].context.canvas,
        (xFrom + xDiff) * tileSize,
        (yFrom + yDiff) * tileSize,
        xTo * tileSize,
        yTo * tileSize,
        xFrom * tileSize,
        yFrom * tileSize,
        xTo * tileSize,
        yTo * tileSize,
      );

      if (xDiff !== 0) {
        let xOffsetFrom = visibleArea[0] - xDiff;
        const yOffsetFrom = 0;

        if (xDiff < 0) {
          xOffsetFrom = 0;
        }

        const xOffsetTo = xOffsetFrom + Math.abs(xDiff);
        const yOffsetTo = visibleArea[1];

        drawImage(cache[tilesetOffset].context, {
          x,
          y,
          xOffsetFrom,
          xOffsetTo,
          yOffsetFrom,
          yOffsetTo,
          tilesetOffset,
        });
      }

      if (yDiff !== 0) {
        let xOffsetFrom = 0;
        let yOffsetFrom = visibleArea[1] - yDiff;

        if (xDiff < 0) {
          xOffsetFrom = -xDiff;
        }

        if (yDiff < 0) {
          yOffsetFrom = 0;
        }

        const xOffsetTo = xOffsetFrom + visibleArea[0] - Math.abs(xDiff);
        const yOffsetTo = yOffsetFrom + Math.abs(yDiff);

        drawImage(cache[tilesetOffset].context, {
          x,
          y,
          xOffsetFrom,
          xOffsetTo,
          yOffsetFrom,
          yOffsetTo,
          tilesetOffset,
        });
      }

      cache[tilesetOffset].x = x;
      cache[tilesetOffset].y = y;

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

      if (portMetadata) {
        return offsetsToCheck.some(({ x, y }, i) => {
          const tile = tiles(position.x + x, position.y + y);

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

      return offsetsToCheck.some(({ x, y }) => {
        const tile = tiles(position.x + x, position.y + y);
        return tile >= 50;
      });
    },
    tilemapColumns,
    tilemapRows,
  };
};

export type Map = ReturnType<typeof createMap>;

export default createMap;
