import updateInterface from './updateInterface';
import { sample } from '../utils';
import state from './state';
import { getUsedShips, isDay } from './selectors';
import { shipData } from '../data/shipData';
import { Provisions, Ship } from '../game/world/fleets';
import { minutesUntilNextMorning } from '../interface/interfaceUtils';
import type { QuestId } from '../interface/quest/questData';
import { getPlayerFleet, getPlayerFleetShip } from './selectorsFleet';
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

export const getAvailableSailorId = () =>
  state.mates.find(({ role }) => role === null || Number.isNaN(role))?.sailorId;

export const addShip = (ship: Omit<Ship, 'sailorId'>) => {
  const sailorId = getAvailableSailorId();
  const fleet = getPlayerFleet();

  if (!sailorId) {
    throw Error('Tried to add a ship to fleet despite no available sailors');
  }

  fleet.push(ship);

  for (let i = 0; i < state.mates.length; i += 1) {
    if (state.mates[i].sailorId === sailorId) {
      state.mates[i].role = fleet.length - 1;
      break;
    }
  }
};

const USED_SHIP_DURABILITY = 0.85;

export const buyUsedShip = (id: string, shipName: string) => {
  const usedShip = getUsedShips();
  const { durability, basePrice } = shipData[usedShip[id]];

  state.gold -= basePrice;

  addShip({
    id: usedShip[id],
    name: shipName,
    crew: 0,
    cargo: [],
    durability: Math.floor(durability * USED_SHIP_DURABILITY),
  });

  delete usedShip[id];

  updateGeneral();
};

export const SELL_SHIP_MODIFIER = 0.5;

export const sellShipNumber = (shipNumber: number) => {
  const { id } = getPlayerFleetShip(shipNumber);

  const fleet = getPlayerFleet();
  fleet.splice(shipNumber, 1);

  const sellPrice = shipData[id].basePrice * SELL_SHIP_MODIFIER;
  state.gold += sellPrice;

  for (let i = 0; i < state.mates.length; i += 1) {
    if (state.mates[i].role === shipNumber) {
      state.mates[i].role = null;
      break;
    }
  }

  if (fleet.length && shipNumber === 0) {
    const mate = state.mates.find(({ role }) => role === 1);

    if (mate) {
      mate.role = null;
    }

    state.mates[0].role = 0;
  }

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

  addShip({
    id,
    name: 'Hermes II',
    crew: 0,
    cargo: [],
    durability: Math.floor(durability * USED_SHIP_DURABILITY),
  });

  updateGeneral();
};

export const recruitRocco = () => {
  state.mates.push({
    sailorId: '32',
    role: null,
  });
};

export const recruitEnrico = () => {
  state.mates.push({
    sailorId: '33',
    role: null,
  });
};

export const assignFirstRoles = () => {
  if (Number.isNaN(state.mates[1].role)) {
    state.mates[1].role = 'firstMate';
  }

  if (Number.isNaN(state.mates[2].role)) {
    state.mates[2].role = 'bookKeeper';
  }

  /*
    In the original game, no check is done before assigning Rocco and Enrico their roles.
    If you hand them ships, they’ll be assigned First Mate and Bookkeeper while still
    remaining as captains (allowing them to captain 2 ships each).
   */
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

// cost in the original game is economy / 20 + 5
export const CREW_COST = 40;

export const recruitCrew = (amount: number) => {
  let remaining = amount;

  const ships = getPlayerFleet();

  for (let i = 0; i < ships.length; i += 1) {
    if (!remaining) {
      return;
    }

    let assign = shipData[ships[i].id].minimumCrew - ships[i].crew;

    if (assign > remaining) {
      assign = remaining;
    }

    ships[i].crew += assign;
    remaining -= assign;
  }

  state.gold -= amount * CREW_COST;

  updateGeneral();
};
