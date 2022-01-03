import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './store';
import { useAppSelector } from './hooks';
import { Building } from './building/Building';
import { getBuildingId } from './portSlice';

const Interface = () => {
  const buildingId = useAppSelector(getBuildingId);

  if (buildingId) {
    return <Building />;
  }

  return null;
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
