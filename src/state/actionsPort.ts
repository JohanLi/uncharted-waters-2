import updateInterface from './updateInterface';
import { sample } from '../utils';
import state from './state';
import { isDay } from './selectors';
import { shipData } from '../data/shipData';
import { Provisions } from '../world/fleets';
import type { Quests } from '../interface/quest/questData';

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

export const exitBuilding = () => {
  state.timePassed += sample([40, 60, 80]);
  state.buildingId = null;

  if (isDay()) {
    state.port.characters().spawnNpcs();
  } else {
    state.port.characters().despawnNpcs();
  }

  updateGeneral();
};

const USED_SHIP_DURABILITY = 0.85;

export const purchaseUsedShip = (shipId: string, shipName: string) => {
  const { durability, minimumCrew, basePrice } = shipData[shipId];

  state.fleets['1'].ships.push({
    id: shipId,
    name: shipName,
    crew: minimumCrew,
    cargo: [],
    durability: Math.floor(durability * USED_SHIP_DURABILITY),
  });
  state.gold -= basePrice;

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

export const supplyShipNumber = (
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

export const completeQuest = (quest: Quests) => {
  state.quests.push(quest);
};

export const receiveGold = (amount: number) => {
  state.gold += amount;

  updateGeneral();
};
