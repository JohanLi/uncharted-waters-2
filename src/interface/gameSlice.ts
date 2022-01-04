import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { exitBuilding } from './portSlice';
import { sample } from '../utils';
import { portAdjacentAt } from './utils';
import { RootState } from './store';

const START_DATE = new Date(1522, 4, 17);

interface Velocity {
  direction: number;
  speed: number;
}

interface State {
  portId: number;
  timePassed: number;
  seaPosition: {
    x: number;
    y: number;
  };
  gold: number;
  indicators: {
    wind: Velocity,
    current: Velocity,
    fleet: Velocity,
  },
  water: number,
  food: number,
  lumber: number,
  shot: number,
}

const initialState: State = {
  portId: 1,
  timePassed: 480,
  seaPosition: {
    x: 838,
    y: 358,
  },
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
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setSail: (state) => {
      // TODO should be able to check for an available adjacent tile. This way, sea position does not need to be preset
      state.portId = 0;
    },
    dock: (state) => {
      if (state.portId) {
        return;
      }

      const portId = portAdjacentAt(state.seaPosition);

      if (portId) { // TODO prompt a message otherwise
        state.portId = Number(portId);
      }
    },
    tick: (state) => {
      state.timePassed += 4;
    },
    updatePosition: (state, action: PayloadAction<{ x: number; y: number }>) => {
      // TODO rough solution for now. More state needs to move into Redux.
      if (state.portId) {
        return;
      }

      state.seaPosition = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(exitBuilding, (state) => {
      state.timePassed += sample([40, 60, 80]);
    });
  },
});

export const { setSail, dock, tick, updatePosition } = gameSlice.actions;

export const getFormattedDate = (state: RootState) => {
  const date = new Date(START_DATE);
  date.setMinutes(date.getMinutes() + state.game.timePassed);

  return `${date.toLocaleString('en-us', { month: 'short' })} ${date.getDate()} ${date.getFullYear()}`;
}

export const getTime = (state: RootState) => {
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

export const getTimeOfDay = (state: RootState) => {
  return state.game.timePassed % 1440;
};

export default gameSlice.reducer;
