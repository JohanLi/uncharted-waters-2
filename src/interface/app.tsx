import React from 'react';
import ReactDOM from 'react-dom';
import {Provider, useSelector} from 'react-redux';

import { store } from './store';
import { Building } from './building/Building';
import { selectBuilding } from './building/buildingSlice';

const Interface = () => {
  const buildingId = useSelector(selectBuilding);

  if (!buildingId) {
    return null;
  }

  return (
    <div>
      <Building buildingId={buildingId} />
    </div>
  );
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
};

export default renderInterface;
