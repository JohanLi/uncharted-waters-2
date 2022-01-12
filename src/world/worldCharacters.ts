import Input from '../input';
import type { Position } from '../types';
import { Map } from '../map';
import createPlayer, { Player } from '../player';
import createNpc, { Npc } from '../npc';
import gameState from '../gameState';
import type { Ship } from './fleets';
import { hasOars } from './worldUtils';

const FRAMES_PER_SHIP = 8;
const SHIP_VARIANTS = 2;

export const getStartFrame = (flagship: Ship, isPlayer = false) => {
  const startFrame = hasOars(flagship) ? 0 : FRAMES_PER_SHIP;

  return isPlayer ? startFrame : startFrame + FRAMES_PER_SHIP * SHIP_VARIANTS;
};

const createWorldCharacters = (map: Map) => {
  const playerFleet = gameState.fleets[1];

  if (!playerFleet.position) {
    throw Error('Player fleet has no position');
  }

  const player = createPlayer(
    playerFleet.position.x,
    playerFleet.position.y,
    getStartFrame(playerFleet.ships[0], true),
    'n',
  );

  const npcs: Npc[] = [];

  for (let id = 2; id <= Object.keys(gameState.fleets).length; id += 1) {
    const { position, ships } = gameState.fleets[id];

    if (!position) {
      throw Error('NPC fleet has no position');
    }

    npcs.push(
      createNpc(position.x, position.y, getStartFrame(ships[0]), 'n', true),
    );
  }

  // TODO: find way to rid the destination argument. It's currently needed by alternativeDirection()
  const collision = (character: Player | Npc, destination?: Position) =>
    map.collisionAt(destination || character.destination());

  return {
    update: () => {
      player.update();

      const direction = Input.get({ includeOrdinal: true });

      // this check allows the player to keep their heading even after releasing input
      if (direction) {
        player.setHeading(direction);
      }

      player.updateSpeed();

      const heading = player.heading();

      if (heading) {
        player.move(heading);

        if (collision(player)) {
          player.undoMove();
        }
      }

      npcs.forEach((npc) => {
        npc.update();

        if (!npc.shouldMove()) {
          return;
        }

        npc.move();

        if (collision(npc)) {
          npc.undoMove();
        }
      });
    },
    getPlayer: () => player,
    getNpcs: () => npcs,
  };
};

export type WorldCharacters = ReturnType<typeof createWorldCharacters>;

export default createWorldCharacters;
