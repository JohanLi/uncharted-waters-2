import { START_POSITION_X, START_POSITION_Y } from '../constants';
import state, { Stage } from './state';

export const getStage = (): Stage => {
  if (!state.portId) {
    return 'world';
  }

  if (state.buildingId) {
    return 'building';
  }

  return 'port';
};

export const getTimeOfDay = () => state.timePassed % 1440;

export const isDay = () => {
  const timeOfDay = getTimeOfDay();

  return timeOfDay >= 240 && timeOfDay < 1200;
};

export const shouldUpdateWorldStatus = () => state.timePassed % 240 === 0;

export const positionAdjacentToPort = (portId: number) => {
  if (portId === 1) {
    return {
      x: START_POSITION_X,
      y: START_POSITION_Y,
    };
  }

  throw Error('Method is not implemented for ports other than Lisbon');
};
