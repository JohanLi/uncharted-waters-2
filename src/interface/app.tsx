import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './store';
import { useAppSelector } from './hooks';
import { Building } from './building/Building';
import { getBuildingId } from './portSlice';
import { Port } from './building/Port';
import { Sea } from './building/Sea';
import memoryState from '../memoryState';

const Interface = () => {
  const buildingId = useAppSelector(getBuildingId);
  const portId = useAppSelector((state) => state.game.portId);

  if (!portId) {
    return <Sea />;
  }

  if (buildingId) {
    return <Building />;
  }

  return <Port />;
};

const renderInterface = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <Interface />
      </Provider>
    </React.StrictMode>,
    document.getElementById('interface'),
  );

  const { game } = store.getState();

  memoryState.stage = game.portId ? 'port' : 'sea';
  memoryState.timePassed = game.timePassed;
  memoryState.paused = false;
  memoryState.portId = game.portId;

  return memoryState;
};

export default renderInterface;
