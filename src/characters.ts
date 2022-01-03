import getInput from './input'
import { characters as characterMeta } from './port/metadata'

import { Position, Direction } from './types';
import PercentNextMove from './percentNextMove';
import { RootState, store } from './interface/store';
import { enterBuilding } from './interface/portSlice';
import { Map } from './map';
import { Building } from './building';
import createPlayer, { Player } from './player';
import createNpc, { Npc } from './npc';

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

type Options = {
  type: 'port';
  map: Map;
  building: Building;
  state: RootState;
} | {
  type: 'sea';
  map: Map;
  state: RootState;
};

const createCharacters = (options: Options) => {
  const { type, map, building, state } = options;

  let { spawn, startFrame, isImmobile } = characterMeta[1];
  let { x, y } = type === 'port' ? building.get(spawn.building) : state.game.seaPosition;

  const player = createPlayer(
    x + spawn.offset.x,
    y + spawn.offset.y,
    startFrame,
  );

  const npcs: Npc[] = [];

  if (type === 'port') {
    for (let i = 2; i < 9; i += 1) {
      ({ spawn, startFrame, isImmobile } = characterMeta[i]);
      ({ x, y } = building.get(spawn.building));

      npcs.push(createNpc(
        x + spawn.offset.x,
        y + spawn.offset.y,
        startFrame,
        isImmobile,
      ));
    }
  }

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
      if (PercentNextMove.get() !== 0) {
        return;
      }

      player.update();

      const direction = getInput({ includeOrdinal: type === 'sea' });

      if (direction) {
        player.move(direction);

        if (collision(player)) {
          player.undoMove();

          if (type === 'port') {
            const newDirection = alternativeDirection(
              direction,
              player,
            );

            if (newDirection) {
              player.move(newDirection, false);
            }
          }
        }

        if (type === 'port') {
          const buildingId = building.at(player.destination());

          if (buildingId) {
            player.update();
            player.move('s');
            store.dispatch(enterBuilding(buildingId));
          }
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
    player,
    npcs,
  }
}

export default createCharacters;
