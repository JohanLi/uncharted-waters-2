import Input from '../input';
import { Position } from '../types';
import { Map } from '../map';
import createPlayer, { Player } from '../player';
import createNpc, { Npc } from '../npc';
import gameState from '../gameState';
import { Ship } from './fleets';
import { hasOars } from './seaUtils';

const createSeaCharacters = (map: Map) => {
  const playerFleetPosition = gameState.fleets[0].position;

  const player = createPlayer(
    playerFleetPosition.x,
    playerFleetPosition.y,
    getStartFrame(gameState.fleets[0].ships[0], true),
    'n',
  );

  const npcs: Npc[] = [];

  gameState.fleets.slice(1).forEach((npcFleet) => {
    const { position, ships } = npcFleet;

    npcs.push(createNpc(
      position.x,
      position.y,
      getStartFrame(ships[0]),
      'n',
      true,
    ));
  });

  // TODO: find way to rid the destination argument. It's currently needed by alternativeDirection()
  const collision = (character: Player | Npc, destination?: Position) => map.collisionAt(destination || character.destination());

  return {
    update: () => {
      player.update();

      const direction = Input.get({ includeOrdinal: true });

      if (direction) {
        player.move(direction);

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

        // TODO collision check not needed for immobile npcs
        if (collision(npc)) {
          npc.undoMove();
        }
      });
    },
    getPlayer: () => player,
    getNpcs: () => npcs,
  };
}

const FRAMES_PER_SHIP = 8;
const SHIP_VARIANTS = 2;

export const getStartFrame = (flagship: Ship, isPlayer = false) => {
  const startFrame = hasOars(flagship) ? 0 : FRAMES_PER_SHIP;

  return isPlayer ? startFrame : startFrame + FRAMES_PER_SHIP * SHIP_VARIANTS;
}

export type SeaCharacters = ReturnType<typeof createSeaCharacters>;

export default createSeaCharacters;
