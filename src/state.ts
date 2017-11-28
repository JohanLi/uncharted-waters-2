import { observable, action } from "mobx";
import { ICharacter } from "./types";

interface IState {
  date: string;
  gold: number;
  portId: number;
  building: string;
  characters: ICharacter[];
  enterBuilding(type: string): void;
}

const state: IState = observable({
  date: "1522-05-17T08:00:00+00:00",
  gold: 49273,
  portId: 0,
  building: "",
  characters: [],

  enterBuilding: action((type: string) => {
    state.building = type;
  }),
});

export default state;
