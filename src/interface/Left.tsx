import * as React from "react";
import state from "../state";

const Left = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const d: Date = new Date(state.date);

  const date = () =>
    `${months[d.getUTCMonth()]} ${d.getUTCDate()} ${d.getUTCFullYear()}`;

  const timeOfDay = () => {
    let hours = d.getUTCHours();
    let period = "AM";

    if (hours >= 12) {
      period = "PM";
    }
    hours = hours % 12;

    if (hours === 0) {
      hours = 12;
    }

    const minutes = d.getUTCMinutes();

    if (minutes < 10) {
      return `${hours}:0${minutes} ${period}`;
    }

    return `${hours}:${minutes} ${period}`;
  };

  const ingots = () => Math.floor(state.gold / 10000);
  const coins = () => state.gold % 10000;

  return (
    <div id="left-hud">
      <div className="date">
        {date()}
      </div>
      <div className="time-of-day">
        {timeOfDay()}
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
        {coins()}
      </div>
      <div>
        Gold Ingots
      </div>
      <div className="value">
        {ingots()}
      </div>
    </div>
  );
};

export default Left;
