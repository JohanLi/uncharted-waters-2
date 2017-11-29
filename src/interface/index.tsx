import * as React from "react";
import * as ReactDOM from "react-dom";

import Building from "./Building";
import Left from "./Left";
import Right from "./Right";

import "./styles.scss";

const Interface: React.SFC<{}> = () => (
  <div id="center">
    <main id="app">
      <Left />
      <Right />
      <Building />
      <canvas id="camera" width="1280" height="800" />
    </main>
  </div>
);

const renderInterface = () => {
  ReactDOM.render(
    <Interface />,
    document.getElementById("root"),
  );
};

export default renderInterface;
