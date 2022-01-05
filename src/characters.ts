import getInput from './input';

import { Position, Direction } from './types';
import PercentNextMove from './percentNextMove';
import { enterBuilding } from './interface/portSlice';
import { Map } from './map';
import createBuilding, { Building } from './building';
import createPlayer, { Player } from './player';
import createNpc, { Npc } from './npc';
import memoryState, { MemoryState } from './memoryState';
import { store } from './interface/store';
import { portCharacterMetadata } from './interface/utils';
import { nextDay } from './interface/gameSlice';

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

const createCharacters = (state: MemoryState, map: Map) => {
  const { stage, portId } = state;
  const { game: { portCharactersData, seaCharactersData } } = store.getState();

  let player: Player;
  const npcs: Npc[] = [];

  let building: Building;

  if (stage === 'port') {
    const playerData = portCharactersData[0];

    player = createPlayer(
      playerData.x,
      playerData.y,
      portCharacterMetadata[playerData.i].startFrame,
    );

    for (let i = 1; i < portCharactersData.length; i += 1) {
      const npcData = portCharactersData[i];
      const { startFrame, isImmobile } = portCharacterMetadata[npcData.i];

      npcs.push(createNpc(
        npcData.x,
        npcData.y,
        startFrame,
        isImmobile,
      ));
    }

    building = createBuilding(portId);
  } else {
    player = createPlayer(
      seaCharactersData[0].x,
      seaCharactersData[0].y,
      4,
    );
  }

  state.player = player;
  state.npcs = npcs;

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

      // TODO reconsider placement
      if (memoryState.stage === 'sea') {
        memoryState.timePassed += 20;

        if (memoryState.timePassed % 1440 === 0) {
          store.dispatch(nextDay());
        }
      }

      player.update();

      const direction = getInput({ includeOrdinal: stage === 'sea' });

      if (direction) {
        player.move(direction);

        if (collision(player)) {
          player.undoMove();

          if (stage === 'port') {
            const newDirection = alternativeDirection(
              direction,
              player,
            );

            if (newDirection) {
              player.move(newDirection, false);
            }
          }
        }

        if (stage === 'port') {
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
