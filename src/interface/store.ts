import { configureStore } from '@reduxjs/toolkit';

import gameReducer from './gameSlice';
import portReducer from './portSlice';

export const store = configureStore({
  reducer: {
    game: gameReducer,
    port: portReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
