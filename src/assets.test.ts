import { load, Images, Tilemaps } from './assets';

test('loading assets', async () => {
  Object.defineProperty(global.Image.prototype, 'src', {
    set() {
      setTimeout(() => this.onload());
    },
  });

  global.HTMLCanvasElement.prototype.getContext = jest.fn().mockReturnValue({
    drawImage: () => undefined,
    imageSmoothingEnabled: true,
  });

  const tilemap = [1, 1, 1, 1];

  global.fetch = jest.fn().mockResolvedValue({
    arrayBuffer: () => Promise.resolve(tilemap),
  });

  await load();

  expect(Images.portTilesets instanceof HTMLCanvasElement).toEqual(true);
  expect(Tilemaps.port).toEqual(new Uint8Array(tilemap));
});
