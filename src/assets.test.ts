import { beforeEach, describe, expect, test, vi } from 'vitest';
import Assets from './assets';

describe('assets', () => {
  const tilemap = [1, 1, 1, 1];

  const dataUrl = 'data:image/png;base64...';

  beforeEach(() => {
    globalThis.HTMLCanvasElement.prototype.getContext = vi
      .fn()
      .mockReturnValue({
        drawImage: () => undefined,
        imageSmoothingEnabled: true,
      });

    globalThis.fetch = vi.fn().mockResolvedValue({
      arrayBuffer: () => Promise.resolve(tilemap),
    });

    globalThis.HTMLCanvasElement.prototype.toDataURL = vi
      .fn()
      .mockReturnValue(dataUrl);
  });

  test('load', async () => {
    Object.defineProperty(globalThis.Image.prototype, 'src', {
      set(this: HTMLImageElement) {
        setTimeout(() => {
          this.onload?.(new Event('load'));
        });
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
    Object.defineProperty(globalThis.Image.prototype, 'src', {
      set(this: HTMLImageElement) {
        setTimeout(() => {
          this.onerror?.(new Event('error'));
        });
      },
    });

    return expect(Assets.load()).rejects.toThrow('Failed loading image');
  });
});
