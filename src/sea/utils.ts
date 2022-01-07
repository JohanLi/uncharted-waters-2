/*
  The world map is 2160x1080, divided into 30x15 areas where each area is 72x72 tiles.
  Each area has its own wind and current presets and is based on season:
    https://media.githubusercontent.com/media/JohanLi/uncharted-waters-2/readme-assets/world-map-summer-winds.png
    https://media.githubusercontent.com/media/JohanLi/uncharted-waters-2/readme-assets/world-map-winter-winds.png
    https://media.githubusercontent.com/media/JohanLi/uncharted-waters-2/readme-assets/world-map-ocean-current.png
  Storms are also based on this mechanic:
    https://media.githubusercontent.com/media/JohanLi/uncharted-waters-2/readme-assets/world-map-anomalies.png
 */

import { Data } from '../assets';
import { START_DATE } from '../constants';
import { random } from '../utils';

export const getSeaArea = (position: { x: number, y: number }) => {
  const areaColumn = Math.floor(position.x / 72);
  const areaRow = Math.floor(position.y / 72);

  return 1 + areaColumn + areaRow * 30;
}

const randomDirection = (direction: number) => {
  const newDirection = direction + random(-1, 1);

  if (newDirection === -1) {
    return 7;
  }

  return newDirection;
};

export const getRandomWindCurrentVelocities = (seaArea: number, timePassed: number) => {
  const date = new Date(START_DATE);
  date.setMinutes(date.getMinutes() + timePassed);
  const currentMonth = date.getMonth()
  const isSummer = currentMonth >= 3 && currentMonth < 9;

  return {
    wind: {
      direction: randomDirection(Data.windsCurrent[isSummer ? seaArea : seaArea + 900]),
      speed: Data.windsCurrent[isSummer ? seaArea + 450 : seaArea + 1350] + Math.round(Math.random()),
    },
    current: {
      direction: randomDirection(Data.windsCurrent[seaArea + 1800]),
      speed: Data.windsCurrent[seaArea + 2250] + Math.round(Math.random()),
    },
  };
}
