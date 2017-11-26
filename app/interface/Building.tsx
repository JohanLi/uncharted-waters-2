import * as React from "react";
import Dialog from "./Dialog";

const Building = (props: any) => {
  return (
    <div id="building-hud">
      <div id="shop">
        <img src={`/img/buildings/${props.type}.png`} alt="" />
      </div>
      <Dialog id="dialog">
        This feature is not implemented yet. Press ESC to exit this building.
      </Dialog>
      <Dialog id="options">
        <div className="select">
          <div className="active">Buy Goods</div>
          <div>Sell Goods</div>
          <div>Invest</div>
          <div>Market Rate</div>
        </div>
      </Dialog>
    </div>
  );
};

export default Building;
