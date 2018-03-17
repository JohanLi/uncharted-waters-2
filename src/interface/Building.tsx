import { observer } from "mobx-react";
import * as React from "react";

import Dialog from "./Dialog";

import assets from "../assets";
import state from "../state";
import { IAssets } from "../types";

const importBuildings = () => {
  const requireContext = require.context("../", true, /\/buildings\/[a-z-]+.png$/);
  const output: IAssets = {};

  requireContext.keys().forEach((key) => {
    output[key.match(/([a-z-]+).png$/)[1]] = requireContext(key);
  });

  return output;
};

const buildings = importBuildings();

const Building: React.SFC<{}> = observer(() => {
  const type = state.building;

  if (type === "") {
    return null;
  }

  const options = assets.buildings[type].menu;
  state.menuLength = options.length;

  return (
    <div id="building-hud">
      <div id="shop">
        <img src={buildings[type]} alt=""/>
      </div>
      <Dialog id="dialog">
        This feature is not implemented yet. Press ESC to exit this building.
      </Dialog>
      <Dialog id="options" options={options} dialogOption={state.selectedMenu}/>
    </div>
  );
});

export default Building;
