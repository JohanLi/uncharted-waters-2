import { observable, action } from 'mobx';
import Assets from "./assets";

const nameToKey = input => input[0].toLowerCase() + input.slice(1).replace(/\s/g, '');

const state = observable({
  date: '1522-05-17T08:00:00+00:00',
  gold: 49273,
  portId: 1,
  building: 0,
  buildingMenuOptions: [],
  buildingMenuSelected: 0,

  enterBuilding: action((id) => {
    const { name, greeting, menu } = Assets.assets.buildingData[id];

    state.building = id;
    state.buildingGreeting = greeting || 'This feature is not implemented yet. Press ESC to exit this building.';
    state.buildingMenuOptions = menu;
    state.buildingMenuSelected = 0;
    state.buildingImg = Assets.assets.buildings[nameToKey(name)].src;
  }),

  exitBuilding: action(() => {
    state.building = 0;
  }),

  buildingKeydown: action((e) => {
    if (e.key === 'Escape') {
      state.exitBuilding();
    }

    if (e.key === 'Enter') {
      if (state.buildingMenuOptions[state.buildingMenuSelected] === 'Sail') {
        state.setSail();
      }
    }

    if (e.key === 'w') {
      if (state.buildingMenuSelected <= 0) {
        state.buildingMenuSelected = state.buildingMenuOptions.length;
      }

      state.buildingMenuSelected -= 1;
    }

    if (e.key === 's') {
      state.buildingMenuSelected += 1;

      if (state.buildingMenuSelected >= state.buildingMenuOptions.length) {
        state.buildingMenuSelected = 0;
      }
    }
  }),

  buildingOnClick: action((i) => {
    state.buildingMenuSelected = i;

    if (state.buildingMenuOptions[state.buildingMenuSelected] === 'Sail') {
      state.setSail();
    }
  }),

  setSail: action(() => {
    state.portId = 0;
    state.building = 0;
  }),

  goAshore: action((portId) => {
    state.portId = portId;
  }),
});

export default state;
