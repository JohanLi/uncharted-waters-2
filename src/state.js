import { observable, action } from 'mobx';

const keydown = (e) => {
  if (e.key === 'Escape') {
    state.exitBuilding();
  }

  if (e.key === 'w') {
    if (state.selectedMenu <= 0) {
      state.selectedMenu = state.menuLength;
    }

    state.selectedMenu -= 1;
  }

  if (e.key === 's') {
    state.selectedMenu += 1;

    if (state.selectedMenu >= state.menuLength) {
      state.selectedMenu = 0;
    }
  }
};

const state = observable({
  date: '1522-05-17T08:00:00+00:00',
  gold: 49273,
  portId: 1,
  building: 0,
  characters: [],
  selectedMenu: 0,
  menuLength: 0,

  enterBuilding: action((id) => {
    document.addEventListener('keydown', keydown);
    state.selectedMenu = 0;
    state.building = id;
  }),

  exitBuilding: action(() => {
    document.removeEventListener('keydown', keydown);
    state.building = 0;
  }),
});

export default state;
