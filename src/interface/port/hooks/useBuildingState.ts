import { useEffect, useState } from 'react';
import { exitBuilding } from '../../../state/actionsPort';

type State<T> = { option: T | null; step: number };
const initialState = { option: null, step: 0 };

const useBuildingState = <T extends string>() => {
  const [state, setState] = useState<State<T>>(initialState);

  const selectOption = (option: T) => {
    setState({
      option,
      step: 0,
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

    setState({
      option: null,
      step: 0,
    });
  };

  const next = () => {
    setState({
      ...state,
      step: state.step + 1,
    });
  };

  const reset = () => {
    setState(initialState);
  };

  useEffect(() => {
    const onKeyup = (e: KeyboardEvent) => {
      const pressedKey = e.key.toLowerCase();

      if (['e', 'enter'].includes(pressedKey)) {
        if (state.option) {
          next();
        }
      }

      if (['escape', 'backspace'].includes(pressedKey)) {
        back();
      }
    };

    const onContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      back();
    };

    window.addEventListener('keyup', onKeyup);
    window.addEventListener('contextmenu', onContextMenu);

    return () => {
      window.removeEventListener('keyup', onKeyup);
      window.removeEventListener('contextmenu', onContextMenu);
    };
  }, [state]);

  return { selectOption, back, next, reset, state };
};

export default useBuildingState;
