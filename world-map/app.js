import load from './loader';
import updateCamera from './camera';
import character from './character';
import percentNextMove from './percent-next-move';

const assets = {
  worldMap: {
    tileset: '/assets/world-map-tileset.png',
    tilesetShips: '/assets/world-map-tileset-ships.png',
    tiles: '/assets/world-map.bin',
  },
};

load(assets)
  .then((assets) => {
    const loop = (timestamp) => {
      const tilesetOffset = Math.floor(timestamp / 250) % 31;
      const p = percentNextMove();

      character.update(p, assets.worldMap.tiles);
      updateCamera({
        tileset: assets.worldMap.tileset,
        tilesetOffset,
        tilesetCharacters: assets.worldMap.tilesetShips,
        tiles: assets.worldMap.tiles,
        character,
        percentNextMove: p,
      });

      requestAnimationFrame(loop)
    };

    requestAnimationFrame(loop)
  });
