import Character from './Character';
import Input from './Input';

export default class Characters {

  constructor(map) {
    this.map = map;
    this.buildings = map.buildings;

    this.characters = [
      new Character(this.buildings.harbor.x, this.buildings.harbor.y + 32, 4),
      new Character(this.buildings.market.x - 64, this.buildings.market.y + 32, 12),
      new Character(this.buildings.shipyard.x, this.buildings.shipyard.y, 12),
      new Character(this.buildings.bar.x - 64, this.buildings.bar.y + 32, 20),
      new Character(this.buildings.lodge.x - 64, this.buildings.lodge.y + 32, 20),
      new Character(this.buildings.market.x + 64, this.buildings.market.y + 32, 24, true),
      new Character(this.buildings.lodge.x + 64, this.buildings.lodge.y + 32, 26, true),
      new Character(this.buildings.bar.x + 64, this.buildings.bar.y + 32, 28, true)
    ];

    this.player = this.characters[0];
    this.npcs = this.characters.slice(1);
    this.input = new Input();
  }

  update(percentNextMove) {
    this.characters.forEach((character) => {
      character.interpolatePosition(percentNextMove);
    });

    if (percentNextMove === 1) {
      this.movePlayer();
      this.moveNpcs();
    }
  }

  movePlayer() {
    const direction = this.input.direction;

    if (!direction) { return; }

    this.player.move(direction);

    if (this.collision(this.player)) {
      this.player.undoMove();

      const alternateDirection = this.alternateDirection(this.player, this.input.direction);

      if (alternateDirection) {
        this.player.move(alternateDirection);
        this.player.setFrame(alternateDirection);
        return;
      }
    }

    this.player.setFrame(direction);
  }

  moveNpcs() {
    this.npcs.forEach((npc) => {
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

  alternateDirection(character, direction) {
    let direction1 = true;
    let direction2 = true;

    for (let i = 1; i <= 19; i += 1) {
      const destinations = this.alternateDirectionDestinations(direction, character, i);

      if (!direction1 || this.collision(destinations[1], character)) {
        direction1 = false;
      } else if (!this.collision(destinations[2], character)) {
        return destinations[0];
      }

      if (!direction2 || this.collision(destinations[4], character)) {
        direction2 = false;
      } else if (!this.collision(destinations[5], character)) {
        return destinations[3];
      }
    }

    return '';
  }

  alternateDirectionDestinations(direction, character, i) {
    let destinations;

    if (direction === 'up' || direction === 'down') {
      destinations = [
        'right',
        { x: character.x + (32 * i), y: character.y },
        { x: character.x + (32 * i), y: character.y - 32 },
        'left',
        { x: character.x - (32 * i), y: character.y },
        { x: character.x - (32 * i), y: character.y - 32 }
      ];

      if (direction === 'down') {
        destinations[2].y += 64;
        destinations[5].y += 64;
      }
    }

    if (direction === 'right' || direction === 'left') {
      destinations = [
        'up',
        { x: character.x, y: character.y - (32 * i) },
        { x: character.x + 32, y: character.y - (32 * i) },
        'down',
        { x: character.x, y: character.y + (32 * i) },
        { x: character.x + 32, y: character.y + (32 * i) }
      ];

      if (direction === 'left') {
        destinations[2].x -= 64;
        destinations[5].x -= 64;
      }
    }

    return destinations;
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
