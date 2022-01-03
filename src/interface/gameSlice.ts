import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { exitBuilding } from './portSlice';
import { sample } from '../utils';
import { portAdjacentAt } from './utils';

interface State {
  portId: number;
  time: number;
  seaPosition: {
    x: number;
    y: number;
  };
}

const initialState: State = {
  portId: 0,
  time: 480,
  seaPosition: {
    x: 838,
    y: 357,
  },
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setSail: (state) => {
      // TODO should be able to check for an available adjacent tile. This way, sea position does not need to be preset
      state.portId = 0;
    },
    dock: (state, action: PayloadAction<{ x: number; y: number }>) => {
      // TODO relies on Player to pass in position. Look into always storing the position in Redux
      const portId = portAdjacentAt(action.payload);

      if (portId) {
        state.portId = Number(portId);
        state.seaPosition = action.payload;
      }
    },
    tick: (state) => {
      state.time += 4;

      state.time = state.time % 1440;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(exitBuilding, (state) => {
      state.time += sample([40, 60, 80]);

      state.time = state.time % 1440;
    });
  },
});

export const { setSail, dock, tick } = gameSlice.actions;

export default gameSlice.reducer;
