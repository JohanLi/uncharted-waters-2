import updateInterface from './updateInterface';
import { sample } from '../utils';
import state from './state';
import { getUsedShips, isDay } from './selectors';
import { shipData } from '../data/shipData';
import { Provisions } from '../world/fleets';
import { minutesUntilNextMorning } from '../interface/interfaceUtils';
import type { QuestId } from '../interface/quest/questData';
import { getPlayerFleet } from './selectorsFleet';

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
  const { durability, minimumCrew, basePrice } = shipData[usedShip[id]];

  state.fleets['1'].ships.push({
    id: usedShip[id],
    name: shipName,
    crew: minimumCrew,
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
    exitBuilding(true);
  }
};

export const receiveShip = () => {
  const { durability, minimumCrew } = shipData['6'];

  // TODO use buyUsedShip()
  getPlayerFleet().push({
    id: '6',
    name: 'Hermes II',
    crew: minimumCrew,
    cargo: [],
    durability: Math.floor(durability * USED_SHIP_DURABILITY),
  });
};

export const deposit = (amount: number) => {
  state.savings += amount;
  state.gold -= amount;
};

export const withdraw = (amount: number) => {
  state.savings -= amount;
  state.gold += amount;
};

export const borrow = (amount: number) => {
  state.debt += amount;
  state.gold += amount;
};

export const repay = (amount: number) => {
  state.debt -= amount;
  state.gold -= amount;
};
