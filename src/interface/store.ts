import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import buildingReducer from './building/buildingSlice';

export const store = configureStore({
  reducer: {
    building: buildingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
  >;
