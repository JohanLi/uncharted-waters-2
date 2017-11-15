import React from 'react';
import ReactDOM from 'react-dom';

import { Left, Right, Building } from './interface.jsx';

ReactDOM.render(
  <div>
    <div id="center">
      <main id="app">
        <canvas id="camera" width="1280" height="800" />
      </main>
    </div>
  </div>,
  document.getElementById('root')
);
