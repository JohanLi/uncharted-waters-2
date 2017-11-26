import * as React from "react";
import * as ReactDOM from "react-dom";

import Building from "./Building";
import Left from "./Left";
import Right from "./Right";

import state from "../state";

const render = () => {
  const building = state.building;

  ReactDOM.render(
    <div id="center">
      <main id="app">
        <Left />
        <Right />
        <Building type={building} />
        <canvas id="camera" width="1280" height="800" />
      </main>
    </div>,
    document.getElementById("root"),
  );
};

export default render;
