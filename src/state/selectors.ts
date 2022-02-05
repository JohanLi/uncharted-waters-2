import { START_POSITION_X, START_POSITION_Y } from '../constants';
import state, { Stage } from './state';
import generateUsedShips from '../interface/port/shipyard/generateUsedShips';
import type { QuestId } from '../interface/quest/questData';

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

export const positionAdjacentToPort = (portId: string) => {
  if (portId === '1') {
    return {
      x: START_POSITION_X,
      y: START_POSITION_Y,
    };
  }

  throw Error('Method is not implemented for ports other than Lisbon');
};

export const finishedQuest = (id: QuestId) => state.quests.includes(id);

export const canAfford = (cost: number) => state.gold > cost;

// TODO reset used ships for a given port after some time has passed
export const getUsedShips = () => {
  const exitingUsedShips = state.usedShipsAtPort[state.portId!];

  if (exitingUsedShips) {
    return exitingUsedShips;
  }

  const usedShips = generateUsedShips(state.portId!);
  state.usedShipsAtPort[state.portId!] = usedShips;
  return usedShips;
};
