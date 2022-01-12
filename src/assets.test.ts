import Assets from './assets';

test('assets', async () => {
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

  const dataUrl = 'data:image/png;base64...';

  global.HTMLCanvasElement.prototype.toDataURL = jest
    .fn()
    .mockReturnValue(dataUrl);

  await Assets.load();

  expect(Assets.images.portTilesets.constructor.name).toEqual(
    'HTMLCanvasElement',
  );
  expect(Assets.images.dialogCorner.constructor.name).toEqual(
    'HTMLCanvasElement',
  );
  expect(Assets.data.portTilemaps).toEqual(new Uint8Array(tilemap));
  expect(Assets.buildings(12)).toEqual(dataUrl);
  expect(Assets.indicators(0)).toEqual(dataUrl);
});
