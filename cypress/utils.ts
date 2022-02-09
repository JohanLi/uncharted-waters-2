import { SAVED_STATE_KEY, State } from '../src/state/state';

// eslint-disable-next-line import/prefer-default-export
export const setState = (state: Partial<State>) =>
  window.localStorage.setItem(SAVED_STATE_KEY, JSON.stringify(state));
