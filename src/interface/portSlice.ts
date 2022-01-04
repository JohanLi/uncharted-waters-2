import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './store';
import { setSail } from './gameSlice';

interface State {
  buildingId: number;
}

const initialState: State = {
  buildingId: 0,
};

export const portSlice = createSlice({
  name: 'port',
  initialState,
  reducers: {
    enterBuilding: (state, action: PayloadAction<number>) => {
      state.buildingId = action.payload;
    },
    exitBuilding: (state) => {
      state.buildingId = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setSail, (state) => {
      state.buildingId = 0;
    });
  },
});

export const { enterBuilding, exitBuilding } = portSlice.actions;

export const getBuildingId = (state: RootState) => state.port.buildingId;

export default portSlice.reducer;
