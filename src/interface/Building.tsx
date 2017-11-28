import { observer } from "mobx-react";
import * as React from "react";
import Dialog from "./Dialog";

const Building = observer(({ state }) => {
  const type = state.building;

  if (type === "") {
    return null;
  }

  return (
    <div id="building-hud">
      <div id="shop">
        <img src={`/img/buildings/${type}.png`} alt="" />
      </div>
      <Dialog id="dialog">
        This feature is not implemented yet. Press ESC to exit this building.
      </Dialog>
      <Dialog id="options">
        <div className="select">
          <div className="active">Buy Goods</div>
          <div>Sell Goods</div>
          <div>Invest</div>
          <div onClick={state.toggle}>Market Rate</div>
        </div>
      </Dialog>
    </div>
  );
});

export default Building;
