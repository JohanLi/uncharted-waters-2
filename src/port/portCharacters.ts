import getInput from '../input';

import { Position, Direction } from '../types';
import { Map } from '../map';
import { Building } from '../building';
import createPlayer, { Player } from '../player';
import createNpc, { Npc } from '../npc';
import { enterBuilding, getIsNight } from '../gameState';

interface AlternativeDestination {
  direction: Direction,
  step1: Position,
  step2: Position,
}

const alternativeDestinations = (direction: Direction, position: Position) => {
  if (direction === 'n' || direction === 's') {
    const secondStepY = direction === 'n' ? position.y - 1 : position.y + 1;

    return (i: number): AlternativeDestination[] => [
      {
        direction: 'e',
        step1: {
          x: position.x + i,
          y: position.y,
        },
        step2: {
          x: position.x + i,
          y: secondStepY,
        },
      },
      {
        direction: 'w',
        step1: {
          x: position.x - i,
          y: position.y,
        },
        step2: {
          x: position.x - i,
          y: secondStepY,
        },
      },
    ];
  }

  if (direction === 'e' || direction === 'w') {
    const secondStepX = direction === 'e' ? position.x + 1 : position.x - 1;

    return (i: number): AlternativeDestination[] => [
      {
        direction: 'n',
        step1: {
          x: position.x,
          y: position.y - i,
        },
        step2: {
          x: secondStepX,
          y: position.y - i,
        },
      },
      {
        direction: 's',
        step1: {
          x: position.x,
          y: position.y + i,
        },
        step2: {
          x: secondStepX,
          y: position.y + i,
        },
      },
    ];
  }

  return () => [];
};

const createPortCharacters = (map: Map, building: Building) => {
  const { id, spawn } = portCharactersMetadata[0];
  const { x, y } = building.get(spawn.building);

  const player = createPlayer(
    x + spawn.offset.x,
    y + spawn.offset.y,
    getStartFrame(id),
    's',
  );

  const npcs: Npc[] = [];

  const daySpawnNightDespawnNpcs = () => {
    const isNight = getIsNight();

    if (npcs.length === 0 && !isNight) {
      // TODO add special case where additional NPCs should spawn to blockade the port
      for (let i = 1; i < 8; i += 1) {
        const { id, spawn, isStationary = false } = portCharactersMetadata[i];
        const { x, y } = building.get(spawn.building);

        npcs.push(createNpc(
          x + spawn.offset.x,
          y + spawn.offset.y,
          getStartFrame(id),
          's',
          isStationary,
        ));
      }
    }

    if (npcs.length > 0 && isNight) {
      while (npcs.length) {
        npcs.pop();
      }
    }
  }

  daySpawnNightDespawnNpcs();

  const alternativeDirection = (direction: Direction, player: Player): Direction | '' => {
    let firstDirectionPossible = true;
    let secondDirectionPossible = true;

    for (let i = 1; i <= 19; i += 1) {
      const destinations = alternativeDestinations(direction, player.position())(i);

      if (firstDirectionPossible) {
        if (collision(player, destinations[0].step1)) {
          firstDirectionPossible = false;
        } else if (!collision(player, destinations[0].step2)) {
          return destinations[0].direction;
        }
      }

      if (secondDirectionPossible) {
        if (collision(player, destinations[1].step1)) {
          secondDirectionPossible = false;
        } else if (!collision(player, destinations[1].step2)) {
          return destinations[1].direction;
        }
      }
    }

    return '';
  }

  // TODO: find way to rid the destination argument. It's currently needed by alternativeDirection()
  const collision = (character: Player | Npc, destination?: Position) =>
    map.collisionAt(destination || character.destination()) || collisionOthers(character, destination);

  const collisionOthers = (self: Player | Npc, destination?: Position) =>
    [player, ...npcs].some((character) => {
      if (character === self) {
        return false;
      }

      const { x, y } = destination || self.destination();
      const { x: xOther, y: yOther } = character.destination();

      const distanceX = Math.abs(x - xOther);
      const distanceY = Math.abs(y - yOther);

      return distanceX < 2 && distanceY < 2;
    });

  return {
    update: () => {
      player.update();

      const direction = getInput({ includeOrdinal: false });

      if (direction) {
        player.move(direction);

        if (collision(player)) {
          player.undoMove();

          const newDirection = alternativeDirection(
            direction,
            player,
          );

          if (newDirection) {
            player.move(newDirection, false);
          }
        }

        const buildingId = building.at(player.destination());

        if (buildingId) {
          player.update();
          player.move('s'); // TODO perform this on exit instead
          enterBuilding(buildingId);
        }
      }

      npcs.forEach((npc) => {
        npc.update();

        if (!npc.shouldMove()) {
          return;
        }

        npc.move();

        // TODO collision check not needed for immobile npcs
        if (collision(npc)) {
          npc.undoMove();
        }
      });
    },
    daySpawnNightDespawnNpcs,
    getPlayer: () => player,
    getNpcs: () => npcs,
  };
}

export interface PortCharacterMetadata {
  id: number;
  spawn: {
    building: number;
    offset: Position;
  };
  isStationary?: boolean;
}

export const portCharactersMetadata: PortCharacterMetadata[] = [
  {
    id: 1,
    spawn: {
      building: 4,
      offset: {
        x: 0,
        y: 1,
      },
    },
  },
  {
    id: 2,
    spawn: {
      building: 1,
      offset: {
        x: -2,
        y: 1,
      },
    },
  },
  {
    id: 2,
    spawn: {
      building: 3,
      offset: {
        x: 0,
        y: 0,
      },
    },
  },
  {
    id: 3,
    spawn: {
      building: 2,
      offset: {
        x: -2,
        y: 1,
      },
    },
  },
  {
    id: 3,
    spawn: {
      building: 5,
      offset: {
        x: -2,
        y: 1,
      },
    },
  },
  {
    id: 4,
    spawn: {
      building: 1,
      offset: {
        x: 2,
        y: 1,
      },
    },
    isStationary: true,
  },
  {
    id: 5,
    spawn: {
      building: 5,
      offset: {
        x: 2,
        y: 1,
      },
    },
    isStationary: true,
  },
  {
    id: 6,
    spawn: {
      building: 2,
      offset: {
        x: 2,
        y: 1,
      },
    },
    isStationary: true,
  },
];

const FRAMES_PER_CHARACTER = 8;
const FRAMES_PER_STATIONARY_CHARACTER = 2;
const STATIONARY_FROM_ID = 4;

export const getStartFrame = (id: number) => {
  if (id <= STATIONARY_FROM_ID) {
    return (id - 1) * FRAMES_PER_CHARACTER;
  }

  return (STATIONARY_FROM_ID - 1) * FRAMES_PER_CHARACTER + (id - STATIONARY_FROM_ID) * FRAMES_PER_STATIONARY_CHARACTER;
}

export type PortCharacters = ReturnType<typeof createPortCharacters>;

export default createPortCharacters;
