import type { GameState } from '../gameState';

interface UpdateInterface {
  indicators: (indicators: Pick<GameState, 'wind' | 'current'>) => void;
  playerFleetDirection: (direction: number) => void;
  playerFleetSpeed: (speed: number) => void;
}

const updateInterface = {} as UpdateInterface;

export default updateInterface;
