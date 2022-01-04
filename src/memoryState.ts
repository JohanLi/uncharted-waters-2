import { Npc } from './npc';
import { Player } from './player';

export type Stage = 'port' | 'sea';

export interface MemoryState {
  stage: Stage;
  timePassed: number;
  paused: boolean;
  portId: number;
  player: Player;
  npcs: Npc[];
}

export const memoryState = {} as MemoryState;

export const getTimeOfDay = () => memoryState.timePassed % 1440;

export const seaTimeTick = () => {
  if (memoryState.stage === 'sea') {
    memoryState.timePassed += 20;
  }
}

export default memoryState;
