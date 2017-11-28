import * as React from "react";
import assets from "../assets";
import state from "../state";

const Right = () => {
  const { name, economy, industry, type } = assets.ports.ports[state.portId];
  const territory = assets.ports.types[type];

  return (
    <div id="right-hud">
      <div className="port">
        {name}
      </div>
      <div className="time-of-day">
        {territory}
      </div>
      <div>
        Economy
      </div>
      <div className="value">
        {economy}
      </div>
      <div>
        Investment
      </div>
      <div className="value">
        0
      </div>
      <div>
        Industry
      </div>
      <div className="value">
        {industry}
      </div>
      <div>
        Investment
      </div>
      <div className="value">
        0
      </div>
      <div>
        Price Index
      </div>
      <div className="value">
        100%
      </div>
    </div>
  );
};

export default Right;
