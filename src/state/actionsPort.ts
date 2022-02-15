import updateInterface from './updateInterface';
import { sample } from '../utils';
import state from './state';
import { getUsedShips, isDay } from './selectors';
import { shipData } from '../data/shipData';
import { Provisions } from '../game/world/fleets';
import { minutesUntilNextMorning } from '../interface/interfaceUtils';
import type { QuestId } from '../interface/quest/questData';
import { getPlayerFleet } from './selectorsFleet';
import { itemData, ItemId } from '../data/itemData';

export const updateGeneral = () => {
  updateInterface.general({
    portId: state.portId,
    buildingId: state.buildingId,
    timePassed: state.timePassed,
    gold: state.gold,
  });
};

export const enterBuilding = (buildingId: string) => {
  state.buildingId = buildingId;

  updateGeneral();
};

export const exitBuilding = (sleep = false) => {
  if (!sleep) {
    state.timePassed += sample([40, 60, 80]);
  } else {
    state.timePassed += minutesUntilNextMorning(state.timePassed);
  }

  state.buildingId = null;

  if (isDay()) {
    state.port.characters().spawnNpcs();
  } else {
    state.port.characters().despawnNpcs();
  }

  updateGeneral();
};

const USED_SHIP_DURABILITY = 0.85;

export const buyUsedShip = (id: string, shipName: string) => {
  const usedShip = getUsedShips();
  const { durability, basePrice } = shipData[usedShip[id]];

  state.fleets['1'].ships.push({
    id: usedShip[id],
    name: shipName,
    crew: 0,
    cargo: [],
    durability: Math.floor(durability * USED_SHIP_DURABILITY),
  });

  state.gold -= basePrice;

  delete usedShip[id];

  updateGeneral();
};

export const SELL_SHIP_MODIFIER = 0.5;

export const sellShipNumber = (shipNumber: number) => {
  const sellPrice =
    shipData[state.fleets['1'].ships[shipNumber].id].basePrice *
    SELL_SHIP_MODIFIER;

  state.fleets['1'].ships.splice(shipNumber, 1);
  state.gold += sellPrice;

  updateGeneral();
};

export const provisionCost: { [key in Provisions]: number } = {
  water: 0,
  food: 20,
  lumber: 90,
  shot: 120,
};

export const supplyShip = (
  shipNumber: number,
  provision: Provisions,
  quantity: number,
) => {
  const { cargo } = state.fleets['1'].ships[shipNumber];

  const notNew = cargo.some((item) => {
    if (item.type === provision) {
      // eslint-disable-next-line no-param-reassign
      item.quantity += quantity;
      return true;
    }

    return false;
  });

  if (notNew) {
    state.fleets['1'].ships[shipNumber].cargo = cargo;
  } else {
    state.fleets['1'].ships[shipNumber].cargo.push({
      type: provision,
      quantity,
    });
  }

  state.gold -= provisionCost[provision] * quantity;

  updateGeneral();
};

export const completeQuest = (id: QuestId) => {
  state.quests.push(id);
};

export const receiveGold = (amount: number) => {
  state.gold += amount;

  updateGeneral();
};

export const checkIn = () => {
  updateInterface.fade(() => {
    exitBuilding(true);
  });
};

export const exitBuildingIfNotLodge = () => {
  if (state.buildingId !== '5') {
    exitBuilding();
  }
};

export const receiveFirstShip = () => {
  const id = '6';

  const { durability } = shipData[id];

  getPlayerFleet().push({
    id,
    name: 'Hermes II',
    crew: 0,
    cargo: [],
    durability: Math.floor(durability * USED_SHIP_DURABILITY),
  });

  state.mates[0].role = 0;

  updateGeneral();
};

export const recruitRocco = () => {
  state.mates.push({
    sailorId: '32',
  });
};

export const recruitEnrico = () => {
  state.mates.push({
    sailorId: '33',
  });
};

export const assignFirstRoles = () => {
  state.mates[1].role = 'firstMate';
  state.mates[2].role = 'bookKeeper';
};

export const deposit = (amount: number) => {
  state.savings += amount;
  state.gold -= amount;

  updateGeneral();
};

export const withdraw = (amount: number) => {
  state.savings -= amount;
  state.gold += amount;

  updateGeneral();
};

export const borrow = (amount: number) => {
  state.debt += amount;
  state.gold += amount;

  updateGeneral();
};

export const repay = (amount: number) => {
  state.debt -= amount;
  state.gold -= amount;

  updateGeneral();
};

// TODO implement luck
export const pray = () => {};

export const donate = (amount: number) => {
  const percent = (amount / state.gold) * 100;
  state.gold -= amount;

  updateGeneral();

  return percent;
};

export const buyItem = (id: ItemId, gift = false) => {
  if (!gift) {
    const { price } = itemData[id];

    if (price > state.gold) {
      return false;
    }

    state.gold -= price;
  }

  state.items.push(id);

  updateGeneral();

  return true;
};

export const ITEM_SHOP_SELL_MULTIPLIER = 0.5;

export const sellItem = (i: number) => {
  const id = state.items[i];
  const { price } = itemData[id];

  state.gold += price * ITEM_SHOP_SELL_MULTIPLIER;
  state.items.splice(i, 1);

  updateGeneral();

  return true;
};
