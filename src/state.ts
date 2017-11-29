import { observable, action } from "mobx";
import { ICharacter } from "./types";

interface IState {
  date: string;
  gold: number;
  portId: number;
  building: string;
  characters: ICharacter[];
  selectedMenu: number;
  menuLength: number;
  enterBuilding(type: string): void;
  exitBuilding(): void;
}

const keydown = (e: KeyboardEvent) => {
  if (e.key === "Escape") {
    state.exitBuilding();
  }

  if (e.key === "w") {
    if (state.selectedMenu <= 0) {
      state.selectedMenu = state.menuLength;
    }

    state.selectedMenu -= 1;
  }

  if (e.key === "s") {
    state.selectedMenu += 1;

    if (state.selectedMenu >= state.menuLength) {
      state.selectedMenu = 0;
    }
  }
};

const state: IState = observable({
  date: "1522-05-17T08:00:00+00:00",
  gold: 49273,
  portId: 0,
  building: "",
  characters: [],
  selectedMenu: 0,
  menuLength: 0,

  enterBuilding: action((type: string) => {
    document.addEventListener("keydown", keydown);
    state.selectedMenu = 0;
    state.building = type;
  }),

  exitBuilding: action(() => {
    document.removeEventListener("keydown", keydown);
    state.building = "";
  }),
});

export default state;
