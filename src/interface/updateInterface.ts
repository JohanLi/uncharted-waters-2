import type { GameState, ProvisionsType } from '../gameState';

interface UpdateInterface {
  general: (
    general: Pick<GameState, 'portId' | 'buildingId' | 'timePassed' | 'gold'>,
  ) => void;
  dayAtSea: (dayAtSea: number) => void;
  provisions: (provisions: ProvisionsType) => void;
  indicators: (indicators: Pick<GameState, 'wind' | 'current'>) => void;
  playerFleetDirection: (direction: number) => void;
  playerFleetSpeed: (speed: number) => void;
}

const updateInterface = {} as UpdateInterface;

export default updateInterface;
