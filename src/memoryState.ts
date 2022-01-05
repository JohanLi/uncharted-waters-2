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

export default memoryState;
