import * as React from "react";
import * as ReactDOM from "react-dom";

import Building from "./Building";
import Left from "./Left";
import Right from "./Right";

import state from "../state";

const renderInterface = () => {
  ReactDOM.render(
    <div id="center">
      <main id="app">
        <Left />
        <Right />
        <Building state={state} />
        <canvas id="camera" width="1280" height="800" />
      </main>
    </div>,
    document.getElementById("root"),
  );
};

export default renderInterface;
