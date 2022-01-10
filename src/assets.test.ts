import Assets from './assets';

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

  await Assets.load();

  expect(Assets.images.portTilesets instanceof HTMLCanvasElement).toEqual(true);
  expect(Assets.images.dialogCorner instanceof HTMLCanvasElement).toEqual(true);
  expect(Assets.data.portTilemaps).toEqual(new Uint8Array(tilemap));
  expect(Assets.buildings(12) instanceof HTMLCanvasElement).toEqual(true);
  expect(Assets.indicators(0) instanceof HTMLCanvasElement).toEqual(true);
});
