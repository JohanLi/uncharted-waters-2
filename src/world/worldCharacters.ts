import Input from '../input';
import type { Position } from '../types';
import { Map } from '../map';
import createWorldPlayer, { WorldPlayer } from './worldPlayer';
import createWorldNpc, { WorldNpc } from './worldNpc';
import state from '../state/state';
import type { Ship } from './fleets';
import { hasOars } from './worldUtils';

const FRAMES_PER_SHIP = 8;
const SHIP_VARIANTS = 2;

export const getStartFrame = (flagship: Ship, isPlayer = false) => {
  const startFrame = hasOars(flagship) ? 0 : FRAMES_PER_SHIP;

  return isPlayer ? startFrame : startFrame + FRAMES_PER_SHIP * SHIP_VARIANTS;
};

const createWorldCharacters = (map: Map) => {
  const playerFleet = state.fleets[1];

  if (!playerFleet.position) {
    throw Error('Player fleet has no position');
  }

  const player = createWorldPlayer(
    playerFleet.position,
    getStartFrame(playerFleet.ships[0], true),
    'n',
  );

  const npcs: WorldNpc[] = [];

  for (let id = 2; id <= Object.keys(state.fleets).length; id += 1) {
    const { position, ships } = state.fleets[id];

    if (!position) {
      throw Error('NPC fleet has no position');
    }

    npcs.push(createWorldNpc(position, getStartFrame(ships[0]), 'n', true));
  }

  // TODO: find way to rid the destination argument. It's currently needed by alternativeDirection()
  const collision = (
    character: WorldPlayer | WorldNpc,
    destination?: Position,
  ) => map.collisionAt(destination || character.destination());

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
    player: () => player,
    npcs: () => npcs,
  };
};

export type WorldCharacters = ReturnType<typeof createWorldCharacters>;

export default createWorldCharacters;
