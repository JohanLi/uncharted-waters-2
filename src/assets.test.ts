import Assets from './assets';

describe('assets', () => {
  const tilemap = [1, 1, 1, 1];

  const dataUrl = 'data:image/png;base64...';

  beforeEach(() => {
    global.HTMLCanvasElement.prototype.getContext = jest.fn().mockReturnValue({
      drawImage: () => undefined,
      imageSmoothingEnabled: true,
    });

    global.fetch = jest.fn().mockResolvedValue({
      arrayBuffer: () => Promise.resolve(tilemap),
    });

    global.HTMLCanvasElement.prototype.toDataURL = jest
      .fn()
      .mockReturnValue(dataUrl);
  });

  test('load', async () => {
    Object.defineProperty(global.Image.prototype, 'src', {
      set() {
        setTimeout(() => this.onload());
      },
    });

    await Assets.load();

    expect(Assets.images('portTilesets').constructor.name).toEqual(
      'HTMLCanvasElement',
    );
    expect(Assets.images('dialogCorner').constructor.name).toEqual(
      'HTMLCanvasElement',
    );
    expect(Assets.data('portTilemaps')).toEqual(new Uint8Array(tilemap));
    expect(Assets.buildings('12')).toEqual(dataUrl);
  });

  test('loading should fail on image error', () => {
    Object.defineProperty(global.Image.prototype, 'src', {
      set() {
        setTimeout(() => this.onerror());
      },
    });

    return expect(Assets.load()).rejects.toThrow('Failed loading image');
  });
});
