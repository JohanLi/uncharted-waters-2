/* eslint-disable max-len */

import Map from './map';
import Assets from './assets';
import Character from './character';
import PercentNextMove from './percent-next-move';

const canvas = document.getElementById('camera');
const context = canvas.getContext('2d');

const paddedCanvas = document.createElement('canvas');
const paddedContext = paddedCanvas.getContext('2d');

paddedCanvas.width = 1344;
paddedCanvas.height = 896;
paddedContext.imageSmoothingEnabled = false;

let map;

const characterAndCameraRelative = () => {
  const characterXInterpolationOffset = (Character.position.toX - Character.position.x) * PercentNextMove.percentNextMove;
  const characterYInterpolationOffset = (Character.position.toY - Character.position.y) * PercentNextMove.percentNextMove;

  const characterXRelativePadded = Math.floor((21 + characterXInterpolationOffset) * 32) - (64 / 2);
  let characterYRelativePadded = Math.floor((14 + characterYInterpolationOffset) * 32) - (64 / 2);

  const cameraXRelativePadded = ((1344 - 1280) / 2) + Math.floor(characterXInterpolationOffset * 32);
  let cameraYRelativePadded = ((896 - 800) / 2) + Math.floor(characterYInterpolationOffset * 32);

  if (northernBoundary()) {
    characterYRelativePadded = Math.floor((Character.position.y + characterYInterpolationOffset) * 32);
    cameraYRelativePadded = ((896 - 800) / 2) + Math.floor((Character.position.y + characterYInterpolationOffset - 13) * 32);
    cameraYRelativePadded = Math.max(cameraYRelativePadded, 0);
  }

  if (southernBoundary()) {
    characterYRelativePadded = Math.floor((Character.position.y + characterYInterpolationOffset - 1052) * 32);
    cameraYRelativePadded = ((896 - 800) / 2) + Math.floor((Character.position.y + characterYInterpolationOffset - 1065) * 32);
    cameraYRelativePadded = Math.min(cameraYRelativePadded, 96);
  }

  return {
    characterXRelativePadded,
    characterYRelativePadded,
    cameraXRelativePadded,
    cameraYRelativePadded,
  };
};

const northernBoundary = () => Character.position.y < 13 || (Character.position.y === 13 && Character.position.toY === 12);
const southernBoundary = () => Character.position.y > 1065 || (Character.position.y === 1065 && Character.position.toY === 1066);

export default {
  update: () => {
    map = Map.draw();

    const {
      characterXRelativePadded,
      characterYRelativePadded,
      cameraXRelativePadded,
      cameraYRelativePadded,
    } = characterAndCameraRelative();

    paddedContext.drawImage(
      map,
      0,
      0,
    );

    const directionToOffset = {
      up: 0,
      right: 2,
      down: 4,
      left: 6,
    };

    paddedContext.drawImage(
      Assets.assets.worldMap.tilesetShips,
      (directionToOffset[Character.tileset.direction] + Character.tileset.frame) * 32,
      0,
      32,
      32,
      characterXRelativePadded,
      characterYRelativePadded,
      64,
      64,
    );

    context.drawImage(
      paddedCanvas,
      cameraXRelativePadded,
      cameraYRelativePadded,
      1280,
      800,
      0,
      0,
      1280,
      800,
    );
  },
  characterAndCameraRelative, // for testing
};
