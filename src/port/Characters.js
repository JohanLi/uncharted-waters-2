import Assets from '../assets';
import state from '../state';
import Character from './Character';
import Input from './Input';

export default class Characters {
  constructor(map) {
    this.map = map;
    const buildings = map.buildings;

    this.characters = Assets.assets.ports.characters.map((character) => new Character(
      buildings[character.spawn.building].x + character.spawn.offset.x,
      buildings[character.spawn.building].y + character.spawn.offset.y,
      character.frame,
      character.isImmobile,
    ));

    this.player = this.characters[0];
    this.npcs = this.characters.slice(1);
    this.input = new Input();
  }

  update() {
    const percentNextMove = this.percentNextMove();

    this.characters.forEach((character) => {
      character.interpolatePosition(percentNextMove);
    });

    if (percentNextMove === 1) {
      if (this.enteredBuilding()) {
        return;
      }

      this.movePlayer();
      this.moveNpcs();
    }
  }

  percentNextMove() {
    if (window.performance.now() - this.lastMoveTime < 67) {
      return (window.performance.now() - this.lastMoveTime) / 67;
    }

    this.lastMoveTime = window.performance.now();
    return 1;
  }

  enteredBuilding() {
    const id = this.map.buildingAt(this.player);

    if (id) {
      state.enterBuilding(id);
      this.player.move('down');
      this.player.setFrame('down');
      return true;
    }

    return false;
  }

  movePlayer() {
    const direction = this.input.direction;

    if (!direction) {
      return;
    }

    this.player.move(direction);

    if (this.collision(this.player)) {
      this.player.undoMove();

      const alternativeDirection = this.alternativeDirection(this.input.direction, this.player);

      if (alternativeDirection) {
        this.player.move(alternativeDirection);
        this.player.setFrame(alternativeDirection);
        return;
      }
    }

    this.player.setFrame(direction);
  }

  moveNpcs() {
    this.npcs.forEach((npc) => {
      if (npc.randomMovementThrottle()) {
        return;
      }

      if (npc.isImmobile) {
        npc.animate();
        return;
      }

      const direction = npc.randomDirection();

      if (!direction) {
        return;
      }

      npc.move(direction);

      if (this.collision(npc)) {
        npc.undoMove();
      }

      npc.setFrame(direction);
    });
  }

  alternativeDirection(direction, character) {
    const alternativeDestinations = this.alternativeDestinations(direction, character);
    let direction1 = true;
    let direction2 = true;

    for (let i = 1; i <= 19; i += 1) {
      const destinations = alternativeDestinations(i);

      if (!direction1 || this.collision(destinations[0].step1, character)) {
        direction1 = false;
      } else if (!this.collision(destinations[0].step2, character)) {
        return destinations[0].direction;
      }

      if (!direction2 || this.collision(destinations[1].step1, character)) {
        direction2 = false;
      } else if (!this.collision(destinations[1].step2, character)) {
        return destinations[1].direction;
      }
    }

    return '';
  }

  alternativeDestinations(direction, character) {
    if (direction === 'up' || direction === 'down') {
      const step2Y = direction === 'up'
        ? character.y - 32
        : character.y + 32;

      return (i) => [
        {
          direction: 'right',
          step1: {x: character.x + (32 * i), y: character.y},
          step2: {x: character.x + (32 * i), y: step2Y},
        },
        {
          direction: 'left',
          step1: {x: character.x - (32 * i), y: character.y},
          step2: {x: character.x - (32 * i), y: step2Y},
        },
      ];
    }

    if (direction === 'right' || direction === 'left') {
      const step2X = direction === 'right'
        ? character.x + 32
        : character.x - 32;

      return (i) => [
        {
          direction: 'up',
          step1: { x: character.x, y: character.y - (32 * i) },
          step2: { x: step2X, y: character.y - (32 * i) },
        },
        {
          direction: 'down',
          step1: { x: character.x, y: character.y + (32 * i) },
          step2: { x: step2X, y: character.y + (32 * i) },
        },
      ];
    }

    return (i) => [];
  }

  collision(position, self = position) {
    return this.map.outOfBoundsAt(position)
      || this.map.tileCollisionAt(position)
      || this.collisionWith(position, self);
  }

  collisionWith(position, self) {
    return this.characters.some((character) => {
      if (character === self) { return false; }

      const xDifference = position.x - character.x;
      const yDifference = position.y - character.y;
      const xCollision = xDifference < character.width && xDifference > -character.width;
      const yCollision = yDifference < character.height && yDifference > -character.height;

      return xCollision && yCollision;
    });
  }
}
