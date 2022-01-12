/*
  Indicators frequently change, and in particular for the player’s fleet.
  In the event of rapidly changing directions, updating direction and speed
  through Redux or setState is too slow (> 10ms) and causes noticeable
  CPU usage.
 */

import React, { useRef } from 'react';

import Assets from '../../assets';
import updateInterface from '../updateInterface';
import { GameState } from '../../gameState';
import { classNames } from '../interfaceUtils';

const indicatorClass = 'flex items-center';
const speedClass = 'flex-1 text-right text-4xl';

interface Props {
  hidden: boolean;
}

export default function Indicators({ hidden }: Props) {
  const windDirectionRef = useRef<HTMLImageElement>(null!);
  const windSpeedRef = useRef<HTMLDivElement>(null!);
  const currentDirectionRef = useRef<HTMLImageElement>(null!);
  const currentSpeedRef = useRef<HTMLDivElement>(null!);

  const playerFleetDirectionRef = useRef<HTMLImageElement>(null!);
  const playerFleetSpeedRef = useRef<HTMLImageElement>(null!);

  updateInterface.indicators = ({
    wind,
    current,
  }: Pick<GameState, 'wind' | 'current'>) => {
    windDirectionRef.current.src = Assets.indicators(
      wind.direction,
    ).toDataURL();
    windSpeedRef.current.textContent = String(wind.speed);

    currentDirectionRef.current.src = Assets.indicators(
      current.direction,
    ).toDataURL();
    currentSpeedRef.current.textContent = String(current.speed);
  };

  updateInterface.playerFleetDirection = (direction: number) => {
    playerFleetDirectionRef.current.src =
      Assets.indicators(direction).toDataURL();
  };

  updateInterface.playerFleetSpeed = (speed: number) => {
    playerFleetSpeedRef.current.textContent = String(Math.floor(speed / 2));
  };

  return (
    <div
      className={classNames('h-full flex items-center', hidden ? 'hidden' : '')}
    >
      <div className="w-full">
        <div>
          <div className="text-sm mb-4">Wind</div>
          <div className={indicatorClass}>
            <img className="w-20 h-20" ref={windDirectionRef} alt="" />
            <div className={speedClass} ref={windSpeedRef} />
          </div>
        </div>
        <div className="mt-8">
          <div className="text-sm mb-4">Current</div>
          <div className={indicatorClass}>
            <img className="w-20 h-20" ref={currentDirectionRef} alt="" />
            <div className={speedClass} ref={currentSpeedRef} />
          </div>
        </div>
        <div className="mt-20">
          <div className="text-sm mb-4">Your fleet</div>
          <div className={indicatorClass}>
            <img className="w-20 h-20" ref={playerFleetDirectionRef} alt="" />
            <div className={speedClass}>
              <div ref={playerFleetSpeedRef} />
              <div className="text-xs mt-1 -mb-2">knots</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
