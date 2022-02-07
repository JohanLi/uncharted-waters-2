import { useState } from 'react';
import { exitBuilding } from '../../../state/actionsPort';

type State<T> = { option: T | null; step: number };

const initialState = { option: null, step: 0 };

const useBuilding = <T extends string>(exitMessage = false) => {
  const [state, setState] = useState<State<T>>(initialState);

  const selectOption = (option: T) => {
    setState({
      ...state,
      option,
      step: 0,
    });
  };

  const reset = () => {
    setState(initialState);
  };

  const next = () => {
    setState({
      ...state,
      step: state.step + 1,
    });
  };

  const back = (steps = 1) => {
    const step = state.step - steps;

    if (state.option) {
      if (step > 0) {
        setState({
          ...state,
          step,
        });
        return;
      }

      reset();
      return;
    }

    if ((!exitMessage && step < 0) || (exitMessage && step < -1)) {
      exitBuilding();
      return;
    }

    setState({
      ...state,
      step,
    });
  };

  return { state, selectOption, next, back, reset };
};

export default useBuilding;
