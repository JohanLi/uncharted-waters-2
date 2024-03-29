import type { State, ProvisionsType } from './state';

interface UpdateInterface {
  general: (
    general: Pick<State, 'portId' | 'buildingId' | 'timePassed' | 'gold'>,
  ) => void;
  dayAtSea: (dayAtSea: number) => void;
  provisions: (provisions: ProvisionsType) => void;
  indicators: (indicators: Pick<State, 'wind' | 'current'>) => void;
  playerFleetDirection: (direction: number) => void;
  playerFleetSpeed: (speed: number) => void;
  fade: (onComplete: () => void) => void;
}

const updateInterface = {} as UpdateInterface;

export default updateInterface;
