import { observer } from "mobx-react";
import * as React from "react";

import Dialog from "./Dialog";

import assets from "../assets";
import state from "../state";

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
        <img src={`/img/buildings/${type}.png`} alt=""/>
      </div>
      <Dialog id="dialog">
        This feature is not implemented yet. Press ESC to exit this building.
      </Dialog>
      <Dialog id="options" options={options} dialogOption={state.selectedMenu}/>
    </div>
  );
});

export default Building;
