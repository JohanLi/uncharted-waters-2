import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './store';
import { useAppSelector } from './hooks';
import { Building } from './building/Building';
import { Port } from './building/Port';
import { Sea } from './building/Sea';

const Interface = () => {
  const { portId, buildingId } = useAppSelector((state) => state.interface);

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
};

export default renderInterface;
