import Camera from '../src/world-map/camera';
import Character from '../src/world-map/character';
import PercentNextMove from '../src/world-map/percent-next-move';

const defaultCameraAndCharacterPlacement = {
  characterXRelativePadded: 640,
  characterYRelativePadded: 416,
  cameraXRelativePadded: 32,
  cameraYRelativePadded: 48,
};

describe('Camera', () => {
  it('sets correct placement', () => {
    Character.position = {
      x: 300,
      y: 100,
      toX: 300,
      toY: 100,
    };

    expect(Camera.characterAndCameraRelative()).toEqual(defaultCameraAndCharacterPlacement);
  });

  it('sets correct placement when character is moving', () => {
    Character.position = {
      x: 200,
      y: 100,
      toX: 201,
      toY: 101,
    };
    PercentNextMove.percentNextMove = 0.50;

    expect(Camera.characterAndCameraRelative()).toEqual({
      characterXRelativePadded: 656,
      characterYRelativePadded: 432,
      cameraXRelativePadded: 48,
      cameraYRelativePadded: 64,
    });
  });

  it('sets correct placement outside northern boundary', () => {
    Character.position = {
      x: 100,
      y: 13,
      toX: 100,
      toY: 13,
    };

    expect(Camera.characterAndCameraRelative()).toEqual(defaultCameraAndCharacterPlacement);
  });

  it('sets correct placement outside southern boundary', () => {
    Character.position = {
      x: 600,
      y: 1065,
      toX: 600,
      toY: 1065,
    };

    expect(Camera.characterAndCameraRelative()).toEqual(defaultCameraAndCharacterPlacement);
  });

  it('sets correct placement outside northern boundary', () => {
    Character.position = {
      x: 100,
      y: 13,
      toX: 100,
      toY: 13,
    };

    expect(Camera.characterAndCameraRelative()).toEqual(defaultCameraAndCharacterPlacement);
  });

  it('sets correct placement when northern boundary logic is applied', () => {
    PercentNextMove.percentNextMove = 0.25;

    Character.position = {
      x: 100,
      y: 13,
      toX: 100,
      toY: 13,
    };

    expect(Camera.characterAndCameraRelative()).toEqual(defaultCameraAndCharacterPlacement);

    Character.position.toY = 12;

    expect(Camera.characterAndCameraRelative()).toEqual({
      characterXRelativePadded: 640,
      characterYRelativePadded: 408,
      cameraXRelativePadded: 32,
      cameraYRelativePadded: 40,
    });

    Character.position.y = 10;
    Character.position.toY = 10;

    expect(Camera.characterAndCameraRelative()).toEqual({
      characterXRelativePadded: 640,
      characterYRelativePadded: 320,
      cameraXRelativePadded: 32,
      cameraYRelativePadded: 0,
    });

    Character.position.y = 3;
    Character.position.toY = 3;

    expect(Camera.characterAndCameraRelative()).toEqual({
      characterXRelativePadded: 640,
      characterYRelativePadded: 96,
      cameraXRelativePadded: 32,
      cameraYRelativePadded: 0,
    });
  });

  it('sets correct placement when southern boundary logic is applied', () => {
    PercentNextMove.percentNextMove = 0.5;

    Character.position = {
      x: 100,
      y: 1065,
      toX: 100,
      toY: 1065,
    };

    expect(Camera.characterAndCameraRelative()).toEqual(defaultCameraAndCharacterPlacement);

    Character.position.toY = 1066;

    expect(Camera.characterAndCameraRelative()).toEqual({
      characterXRelativePadded: 640,
      characterYRelativePadded: 432,
      cameraXRelativePadded: 32,
      cameraYRelativePadded: 64,
    });

    Character.position.y = 1066;
    Character.position.toY = 1066;

    expect(Camera.characterAndCameraRelative()).toEqual({
      characterXRelativePadded: 640,
      characterYRelativePadded: 448,
      cameraXRelativePadded: 32,
      cameraYRelativePadded: 80,
    });

    Character.position.y = 1078;
    Character.position.toY = 1078;

    expect(Camera.characterAndCameraRelative()).toEqual({
      characterXRelativePadded: 640,
      characterYRelativePadded: 832,
      cameraXRelativePadded: 32,
      cameraYRelativePadded: 96,
    });
  });
});
