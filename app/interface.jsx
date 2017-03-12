import React from 'react';

function Left() {
  return (
    <div id="left-hud">
      <div className="date">
        May 17 1522
      </div>
      <div className="time-of-day">
        8:00 AM
      </div>
      <div>
        Fame in<br />Adventure
      </div>
      <div className="value">
        0
      </div>
      <div>
        Gold Coins
      </div>
      <div className="value">
        0
      </div>
      <div>
        Gold Ingots
      </div>
      <div className="value">
        0
      </div>
    </div>
  );
}

function Right() {
  return (
    <div id="right-hud">
      <div className="port">
        Lisbon
      </div>
      <div className="time-of-day">
        Iberia
      </div>
      <div>
        Economy
      </div>
      <div className="value">
        780
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
        780
      </div>
      <div>
        Investment
      </div>
      <div className="value">
        780
      </div>
      <div>
        Price Index
      </div>
      <div className="value">
        100%
      </div>
    </div>
  );
}

function Building() {
  return (
    <div id="building-hud">
      <div id="shop">
        <img src="/img/buildings/market.png" alt="" />
      </div>
      <div id="dialog" className="dialog">
        This feature is not implemented yet. Press ESC to exit this building.
      </div>
      <div id="options" className="dialog">
        <div className="selected">Buy Goods</div>
        <div>Sell Goods</div>
        <div>Invest</div>
        <div>Market Rate</div>
      </div>
    </div>
  );
}

export { Right, Left, Building };
