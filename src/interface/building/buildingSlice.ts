import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { sample } from '../../utils';

interface State {
  portId: number;
  id: number;
  time: number;
}

const initialState: State = {
  portId: 1,
  id: 0,
  time: 480,
};

export const buildingSlice = createSlice({
  name: 'building',
  initialState,
  reducers: {
    enter: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    },
    exit: state => {
      state.id = 0;
      state.time += sample([40, 60, 80]);

      state.time = state.time % 1440;
    },
  },
});

export const { enter, exit } = buildingSlice.actions;

export default buildingSlice.reducer;
