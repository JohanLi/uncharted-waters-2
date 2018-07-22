import drawMap from './map';

const canvas = document.getElementById('camera');
const context = canvas.getContext('2d');

context.imageSmoothingEnabled = false;

let map;

const update = (options) => {
  if (!map || options.percentNextMove === 0) {
    map = drawMap(options);
  }

  context.drawImage(
    map,
    16 + Math.floor((options.character.position.toX - options.character.position.x) * 16 * options.percentNextMove),
    16 + Math.floor((options.character.position.toY - options.character.position.y) * 16 * options.percentNextMove) + (16 / 2),
    640,
    400,
    0,
    0,
    640 * 2,
    400 * 2,
  );

  const directionToOffset = {
    up: 0,
    right: 2,
    down: 4,
    left: 6,
  };

  context.drawImage(
    options.tilesetCharacters,
    (directionToOffset[options.character.tileset.direction] + options.character.tileset.frame) * 32,
    0,
    32,
    32,
    (1280 / 2) - (64 / 2),
    (800 / 2) - (64 / 2),
    32 * 2,
    32 * 2,
  );
};

export default update;
