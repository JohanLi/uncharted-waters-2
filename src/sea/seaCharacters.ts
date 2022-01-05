import getInput from '../input';
import { Position } from '../types';
import { Map } from '../map';
import createPlayer, { Player } from '../player';
import { Npc } from '../npc';
import gameState from '../gameState';

const createSeaCharacters = (map: Map) => {
  const player = createPlayer(
    gameState.seaPlayerPosition.x,
    gameState.seaPlayerPosition.y,
    4,
  );

  const npcs: Npc[] = [];

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

      const direction = getInput({ includeOrdinal: true });

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

export type SeaCharacters = ReturnType<typeof createSeaCharacters>;

export default createSeaCharacters;
