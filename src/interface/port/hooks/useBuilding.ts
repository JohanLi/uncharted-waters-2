import { useState } from 'react';
import { exitBuilding } from '../../../state/actionsPort';

type State<T> = { option: T | null; step: number };

const initialState = { option: null, step: 0 };

const useBuilding = <T extends string>() => {
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
    if (state.step > 0) {
      setState({
        ...state,
        step: state.step - steps,
      });
      return;
    }

    if (!state.option) {
      exitBuilding();
      return;
    }

    reset();
  };

  return { state, selectOption, next, back, reset };
};

export default useBuilding;
