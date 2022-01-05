import { createSlice } from '@reduxjs/toolkit';

import { exitBuilding } from './portSlice';
import { sample } from '../utils';
import { getSpawnPortCharactersData, portAdjacentAt, PortCharacterData, SeaCharacterData } from './utils';
import { RootState } from './store';
import memoryState from '../memoryState';

const START_DATE = new Date(1522, 4, 17);
const START_TIME_PASSED = 480; // 8 AM
const START_PORT_ID = 1;

interface Velocity {
  direction: number;
  speed: number;
}

interface State {
  portId: number;
  timePassed: number;
  dayAtSea: number;
  gold: number;
  indicators: {
    wind: Velocity;
    current: Velocity;
    fleet: Velocity;
  };
  water: number;
  food: number;
  lumber: number;
  shot: number;
  portCharactersData: PortCharacterData[];
  seaCharactersData: SeaCharacterData[];
}

const initialState: State = {
  portId: START_PORT_ID,
  timePassed: START_TIME_PASSED,
  dayAtSea: 0,
  gold: 49273,
  indicators: {
    wind: {
      direction: 0,
      speed: 4,
    },
    current: {
      direction: 3,
      speed: 1,
    },
    fleet: {
      direction: 1,
      speed: 14,
    },
  },
  water: 40,
  food: 40,
  lumber: 0,
  shot: 0,
  portCharactersData: getSpawnPortCharactersData(START_PORT_ID),
  seaCharactersData: [
    {
      i: 0,
      x: 838,
      y: 358,
    },
  ],
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setSail: (state) => {
      // TODO should be able to check for an available adjacent tile. This way, sea position does not need to be preset
      state.portId = 0;

      memoryState.stage = 'sea';
      memoryState.portId = 0;
    },
    dock: (state) => {
      if (state.portId) {
        return;
      }

      const { x, y } = memoryState.player.position();

      const portId = portAdjacentAt({ x, y });

      if (!portId) {
        return;
      }

      state.portId = portId;
      state.portCharactersData = getSpawnPortCharactersData(portId);
      state.seaCharactersData[0].x = x;
      state.seaCharactersData[0].y = y;

      memoryState.stage = 'port';
      memoryState.portId = portId;

      // TODO round time up to :00, :20, :40
      state.timePassed = memoryState.timePassed;
      state.dayAtSea = 0;
    },
    nextDay: (state) => {
      state.timePassed = memoryState.timePassed;
      state.dayAtSea += 1;

      // TODO remove food and water
    },
  },
  extraReducers: (builder) => {
    builder.addCase(exitBuilding, (state) => {
      memoryState.timePassed += sample([40, 60, 80]);
      state.timePassed = memoryState.timePassed;
    });
  },
});

export const { setSail, dock, nextDay } = gameSlice.actions;

export const getDate = (state: RootState) => {
  const date = new Date(START_DATE);
  date.setMinutes(date.getMinutes() + state.game.timePassed);

  return `${date.toLocaleString('en-us', { month: 'short' })} ${date.getDate()} ${date.getFullYear()}`;
}

export const getHoursMinutes = (state: RootState) => {
  let hours = Math.floor((state.game.timePassed % 1440) / 60);
  let period = 'AM';

  if (hours >= 12) {
    period = 'PM';
  }

  hours %= 12;

  if (hours === 0) {
    hours = 12;
  }

  const minutes = state.game.timePassed % 60;

  if (minutes < 10) {
    return `${hours}:0${minutes} ${period}`;
  }

  return `${hours}:${minutes} ${period}`;
};

export default gameSlice.reducer;
