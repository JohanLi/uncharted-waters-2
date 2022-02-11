import { START_POSITION_X, START_POSITION_Y } from '../constants';
import state, { Stage } from './state';
import generateUsedShips from '../interface/port/shipyard/generateUsedShips';
import type { QuestId } from '../interface/quest/questData';
import { getPortData } from '../game/port/portUtils';
import { itemData } from '../data/itemData';

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

// TODO remove hard-coded values
export const positionAdjacentToPort = (portId: string) => {
  if (portId === '1') {
    return {
      x: START_POSITION_X,
      y: START_POSITION_Y,
    };
  }

  return {
    x: 0,
    y: 0,
  };
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

export const getGold = () => state.gold;

export const getSavings = () => state.savings;

const CREDIT_LINE = 1000;

export const getCreditLine = () => Math.max(0, CREDIT_LINE - state.debt);

export const getDebt = () => state.debt;

export const getRepayAmount = () => Math.min(state.debt, state.gold);

export const getAtMosque = () =>
  state.portId && getPortData(state.portId).tileset === 2;

export const getItemShopStock = () => {
  if (!state.portId) {
    return [];
  }

  const port = getPortData(state.portId);

  if (port.isSupplyPort || !port.itemShop) {
    return [];
  }

  const items = [...port.itemShop.regular];
  const secretItem = port.itemShop.secret;

  if (secretItem) {
    items.push(secretItem);
  }

  return items.map((itemId) => ({
    id: itemId,
    name: itemData[itemId].name,
  }));
};

export const getPlayerItems = () =>
  state.items.map((itemId) => ({
    id: itemId,
    name: itemData[itemId].name,
  }));

export const getPlayerItem = (i: number) => itemData[state.items[i]];
