import Input from '../input';

import { Position } from '../types';
import { Map } from '../map';
import { Building } from '../building';
import createPlayer, { PortPlayer } from './portPlayer';
import createNpc, { PortNpc } from './portNpc';
import portCharactersMetadata from './portCharactersMetadata';
import { applyPositionDelta } from '../utils';

const FRAMES_PER_CHARACTER = 8;
const FRAMES_PER_STATIONARY_CHARACTER = 2;
const STATIONARY_FROM_ID = 4;

export const getStartFrame = (id: number) => {
  if (id <= STATIONARY_FROM_ID) {
    return (id - 1) * FRAMES_PER_CHARACTER;
  }

  return (
    (STATIONARY_FROM_ID - 1) * FRAMES_PER_CHARACTER +
    (id - STATIONARY_FROM_ID) * FRAMES_PER_STATIONARY_CHARACTER
  );
};

const createPortCharacters = (
  map: Map,
  building: Building,
  isSupplyPort: boolean,
) => {
  const { id, spawn } = portCharactersMetadata[0];

  const player = createPlayer(
    applyPositionDelta(building.get(spawn.building), spawn.offset),
    getStartFrame(id),
    's',
  );

  const npcs: PortNpc[] = [];

  const collisionOthersAt = (position: Position, self: PortPlayer | PortNpc) =>
    [player, ...npcs].some((character) => {
      if (character === self) {
        return false;
      }

      const { x, y } = position;
      const { x: xOther, y: yOther } =
        character.destination() || character.position();

      const distanceX = Math.abs(x - xOther);
      const distanceY = Math.abs(y - yOther);

      return distanceX < 2 && distanceY < 2;
    });

  const collisionAt = (position: Position, self: PortPlayer | PortNpc) =>
    map.collisionAt(position) || collisionOthersAt(position, self);

  return {
    update: () => {
      player.update();

      npcs.forEach((npc) => {
        npc.update();
      });

      /*
        When entering a building, we want the movement towards the door to
        be rendered.

        At the same time, we want to prevent the rare case where an NPC could
        be blocking when we exit. To accomplish this, NPC movement is skipped
        both when entering and exiting.
       */
      if (player.enteredBuilding()) {
        return;
      }

      const direction = Input.getDirection({ includeOrdinal: false });

      if (direction) {
        player.move(direction, (position: Position) =>
          collisionAt(position, player),
        );
      }

      if (player.willEnterBuilding(building.at)) {
        return;
      }

      npcs.forEach((npc) => {
        if (npc.shouldMove()) {
          npc.move((position: Position) => collisionAt(position, npc));
        }
      });
    },
    spawnNpcs: () => {
      if (npcs.length || isSupplyPort) {
        return;
      }

      // TODO add special case where additional NPCs should spawn to blockade the port
      for (let i = 1; i < 8; i += 1) {
        const {
          id: npcId,
          spawn: npcSpawn,
          isStationary = false,
        } = portCharactersMetadata[i];

        npcs.push(
          createNpc(
            applyPositionDelta(
              building.get(npcSpawn.building),
              npcSpawn.offset,
            ),
            getStartFrame(npcId),
            's',
            isStationary,
          ),
        );
      }
    },
    despawnNpcs: () => {
      while (npcs.length) {
        npcs.pop();
      }
    },
    player: () => player,
    npcs: () => npcs,
  };
};

export default createPortCharacters;
