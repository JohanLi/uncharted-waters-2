import Assets from '../../assets';
import { random } from '../../utils';

export const getSeaArea = (position: { x: number; y: number }) => {
  const areaColumn = Math.floor(position.x / 72);
  const areaRow = Math.floor(position.y / 72);

  return areaColumn + areaRow * 30;
};

/*
  Guesswork through observing the game.
  The original direction seems to rarely change between updates.
 */
const randomDirection = (direction: number) => {
  const roll = random(1, 100);

  if (roll <= 80) {
    return direction;
  }

  if (roll <= 90) {
    return direction === 7 ? 0 : direction + 1;
  }

  return direction === 0 ? 7 : direction - 1;
};

export const getWind = (seaArea: number, isSummer: boolean) => {
  const baseDirection =
    Assets.data('windsCurrent')[isSummer ? seaArea : seaArea + 900];
  const baseSpeed =
    Assets.data('windsCurrent')[isSummer ? seaArea + 450 : seaArea + 1350];

  return {
    direction: randomDirection(baseDirection),
    speed: baseSpeed === 7 ? baseSpeed : baseSpeed + random(0, 1),
  };
};

export const getIsSummer = (startDate: Date, timePassed: number) => {
  const date = new Date(startDate);
  date.setMinutes(date.getMinutes() + timePassed);
  const currentMonth = date.getMonth();

  return currentMonth >= 3 && currentMonth < 9;
};

export const getCurrent = (seaArea: number) => ({
  direction: Assets.data('windsCurrent')[seaArea + 1800],
  speed: Assets.data('windsCurrent')[seaArea + 2250],
});
