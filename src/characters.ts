import Input from './input'
import Npc from './npc';
import { characters as characterMeta } from './port/metadata'

import { Position, Direction } from './types';
import PercentNextMove from './percentNextMove';
import { store } from './interface/store';
import { enter } from './interface/building/buildingSlice';
import Player from './player';

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

export default class Characters {
  private map: any;

  public player!: Player;
  public npcs: Npc[] = [];

  constructor(map: any) {
    this.map = map;
    Input.setup();

    for (let i = 1; i < 9; i += 1) {
      const { spawn, startFrame, isImmobile } = characterMeta[i];
      const { x, y } = map.building(spawn.building);

      if (i === 1) {
        this.player = new Player(
          x + spawn.offset.x,
          y + spawn.offset.y,
          startFrame,
        );
      } else {
        this.npcs.push(new Npc(
          x + spawn.offset.x,
          y + spawn.offset.y,
          startFrame,
          isImmobile,
        ));
      }
    }
  }

  update() {
    if (PercentNextMove.get() !== 0) {
      return;
    }

    this.player.update();

    const { direction } = Input;

    if (direction) {
      this.player.move(direction);

      if (this.collision(this.player)) {
        this.player.undoMove();

        const newDirection = this.alternativeDirection(
          direction,
          this.player,
        );

        if (newDirection) {
          this.player.move(newDirection, false);
        }
      }

      const building = this.map.buildingAt(this.player.destination());

      if (building) {
        this.player.update();
        this.player.move('s');
        store.dispatch(enter(building));
      }
    }

    this.npcs.forEach((npc) => {
      npc.update();

      if (!npc.shouldMove()) {
        return;
      }

      if (npc.isImmobile) {
        npc.animate();
        return;
      }

      npc.move();

      if (this.collision(npc)) {
        npc.undoMove();
      }
    });
  }

  private alternativeDirection(direction: Direction, player: Player): Direction | '' {
    let firstDirectionPossible = true;
    let secondDirectionPossible = true;

    for (let i = 1; i <= 19; i += 1) {
      const destinations = alternativeDestinations(direction, player.position())(i);

      if (firstDirectionPossible) {
        if (this.collision(player, destinations[0].step1)) {
          firstDirectionPossible = false;
        } else if (!this.collision(player, destinations[0].step2)) {
          return destinations[0].direction;
        }
      }

      if (secondDirectionPossible) {
        if (this.collision(player, destinations[1].step1)) {
          secondDirectionPossible = false;
        } else if (!this.collision(player, destinations[1].step2)) {
          return destinations[1].direction;
        }
      }
    }

    return '';
  }

  // TODO: find way to rid the destination argument. It's currently needed by alternativeDirection()
  private collision(character: Player | Npc, destination?: Position) {
    return this.map.collisionAt(destination || character.destination()) || this.collisionOthers(character, destination);
  }

  private collisionOthers(self: Player | Npc, destination?: Position) {
    return [this.player, ...this.npcs].some((character) => {
      if (character === self) {
        return false;
      }

      const { x, y } = destination || self.destination();
      const { x: xOther, y: yOther } = character.destination();

      const distanceX = Math.abs(x - xOther);
      const distanceY = Math.abs(y - yOther);

      return distanceX < 2 && distanceY < 2;
    });
  }
}
