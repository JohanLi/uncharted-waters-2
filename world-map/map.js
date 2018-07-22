const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

canvas.width = 640 + 32;
canvas.height = 400 + 16 + 32;

const draw = (options) => {
  const yStart = options.character.position.y + 1 - (canvas.height / 16 / 2);
  const xStart = options.character.position.x + 1 - (canvas.width / 16 / 2);

  for (let y = 0; y < canvas.height / 16; y += 1) {
    for (let x = 0; x < canvas.width / 16; x += 1) {
      const tile = options.tiles[(yStart + y) * 2160 + xStart + x];
      context.drawImage(
        options.tileset,
        tile * 16,
        options.tilesetOffset * 16,
        16,
        16,
        x * 16,
        y * 16,
        16,
        16,
      );
    }
  }

  return canvas;
};

export default draw;
