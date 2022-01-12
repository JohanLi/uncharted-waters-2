import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { START_DATE, START_PORT_ID, START_TIME_PASSED } from '../constants';
import type { GameState, Velocity } from '../gameState';
import type { RootState } from './store';

interface State {
  portId: number;
  buildingId: number;
  timePassed: number;
  gold: number;
  dayAtSea: number;
  indicators: {
    wind: Velocity;
    current: Velocity;
    playerFleet: Velocity;
  };
  water: number;
  food: number;
  lumber: number;
  shot: number;
}

const initialState: State = {
  portId: START_PORT_ID,
  buildingId: 0,
  timePassed: START_TIME_PASSED,
  gold: 2000,
  dayAtSea: 0,
  indicators: {
    wind: {
      direction: 0,
      speed: 0,
    },
    current: {
      direction: 0,
      speed: 0,
    },
    playerFleet: {
      direction: 0,
      speed: 0,
    },
  },
  water: 20,
  food: 20,
  lumber: 0,
  shot: 0,
};

export const interfaceSlice = createSlice({
  name: 'interface',
  initialState,
  reducers: {
    update: (
      state,
      action: PayloadAction<
        Pick<GameState, 'portId' | 'buildingId' | 'timePassed'>
      >,
    ) => {
      const { portId, buildingId, timePassed } = action.payload;

      state.portId = portId;
      state.buildingId = buildingId;
      state.timePassed = timePassed;
    },
    nextDayAtSea: (
      state,
      action: PayloadAction<Pick<GameState, 'timePassed'>>,
    ) => {
      const { timePassed } = action.payload;

      state.timePassed = timePassed;
      state.dayAtSea += 1;
    },
    dockAction: (state) => {
      state.dayAtSea = 0;
    },
  },
});

export const getDate = (state: RootState) => {
  const date = new Date(START_DATE);
  date.setMinutes(date.getMinutes() + state.interface.timePassed);

  return `${date.toLocaleString('en-us', {
    month: 'short',
  })} ${date.getDate()} ${date.getFullYear()}`;
};

export const getHoursMinutes = (state: RootState) => {
  let hours = Math.floor((state.interface.timePassed % 1440) / 60);
  let period = 'AM';

  if (hours >= 12) {
    period = 'PM';
  }

  hours %= 12;

  if (hours === 0) {
    hours = 12;
  }

  const minutes = state.interface.timePassed % 60;

  if (minutes < 10) {
    return `${hours}:0${minutes} ${period}`;
  }

  return `${hours}:${minutes} ${period}`;
};

export const getIngots = (state: RootState) =>
  Math.floor(state.interface.gold / 10000);

export const getCoins = (state: RootState) => state.interface.gold % 10000;

export const { update, nextDayAtSea, dockAction } = interfaceSlice.actions;

export default interfaceSlice.reducer;
