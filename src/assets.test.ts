import { load } from './assets';

describe('assets', () => {
  test('load image', async () => {
    Object.defineProperty(global.Image.prototype, 'src', {
      set() {
        setTimeout(() => this.onload());
      },
    });

    const assets = { a: 'image.png' } as any;
    await load(assets);
    expect(assets.a instanceof HTMLImageElement).toEqual(true);
  });

  test('load tilemap', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      arrayBuffer: () => Promise.resolve([41]),
    });

    const assets = { a: 'tilemap.bin' } as any;
    await load(assets);
    expect(assets.a[0]).toEqual(41);
  });
});
