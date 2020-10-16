import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { sample } from '../../utils';

interface State {
  portId: number;
  buildingId: number;
  time: number;
}

const initialState: State = {
  portId: 1,
  buildingId: 0,
  time: 480,
};

export const slice = createSlice({
  name: 'building',
  initialState,
  reducers: {
    enter: (state, action: PayloadAction<number>) => {
      state.buildingId = action.payload;
    },
    exit: state => {
      state.buildingId = 0;
      state.time += sample([40, 60, 80]);

      state.time = state.time % 1440;
    },
  },
});

export const { enter, exit } = slice.actions;

export const selectBuilding = (state: RootState) => state.building.buildingId;

export default slice.reducer;
