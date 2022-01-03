import { createSlice } from '@reduxjs/toolkit';
import { exitBuilding } from './portSlice';
import { sample } from '../utils';

interface State {
  portId: number;
  time: number;
}

const initialState: State = {
  portId: 1,
  time: 480,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(exitBuilding, (state) => {
      state.time += sample([40, 60, 80]);

      state.time = state.time % 1440;
    });
  },
});

export default gameSlice.reducer;
