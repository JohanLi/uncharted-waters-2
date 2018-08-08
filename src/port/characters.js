import Assets from '../assets';
import state from '../state';
import Character from './Character';
import Input from './input';
import Map from './map';


const percentNextMove = () => {
  if (window.performance.now() - characters.lastMoveTime < 67) {
    return (window.performance.now() - characters.lastMoveTime) / 67;
  }

  characters.lastMoveTime = window.performance.now();
  return 1;
};

const enteredBuilding = () => {
  const id = Map.buildingAt(characters.player);

  if (id) {
    state.enterBuilding(id);
    characters.player.move('s');
    characters.player.setFrame('s');
    return true;
  }

  return false;
};

const movePlayer = () => {
  const direction = Input.direction;

  if (!direction) {
    return;
  }

  characters.player.move(direction);

  if (collision(characters.player)) {
    characters.player.undoMove();

    const a = alternativeDirection(direction, characters.player);

    if (a) {
      characters.player.move(a);
      characters.player.setFrame(a);
      return;
    }
  }

  characters.player.setFrame(direction);
};

const moveNpcs = () => {
  characters.npcs.forEach((npc) => {
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

    if (collision(npc)) {
      npc.undoMove();
    }

    npc.setFrame(direction);
  });
};

const alternativeDirection = (direction, character) => {
  const a = alternativeDestinations(direction, character);
  let direction1 = true;
  let direction2 = true;

  for (let i = 1; i <= 19; i += 1) {
    const destinations = a(i);

    if (!direction1 || collision(destinations[0].step1, character)) {
      direction1 = false;
    } else if (!collision(destinations[0].step2, character)) {
      return destinations[0].direction;
    }

    if (!direction2 || collision(destinations[1].step1, character)) {
      direction2 = false;
    } else if (!collision(destinations[1].step2, character)) {
      return destinations[1].direction;
    }
  }

  return '';
};

const alternativeDestinations = (direction, character) => {
  if (direction === 'n' || direction === 's') {
    const step2Y = direction === 'n'
      ? character.y - 32
      : character.y + 32;

    return (i) => [
      {
        direction: 'e',
        step1: {x: character.x + (32 * i), y: character.y},
        step2: {x: character.x + (32 * i), y: step2Y},
      },
      {
        direction: 'w',
        step1: {x: character.x - (32 * i), y: character.y},
        step2: {x: character.x - (32 * i), y: step2Y},
      },
    ];
  }

  if (direction === 'e' || direction === 'w') {
    const step2X = direction === 'e'
      ? character.x + 32
      : character.x - 32;

    return (i) => [
      {
        direction: 'n',
        step1: { x: character.x, y: character.y - (32 * i) },
        step2: { x: step2X, y: character.y - (32 * i) },
      },
      {
        direction: 's',
        step1: { x: character.x, y: character.y + (32 * i) },
        step2: { x: step2X, y: character.y + (32 * i) },
      },
    ];
  }

  return (i) => [];
};

const collision = (position, self = position) => {
  return Map.outOfBoundsAt(position)
    || Map.tileCollisionAt(position)
    || collisionWith(position, self);
};

const collisionWith = (position, self) => {
  return characters.characters.some((character) => {
    if (character === self) { return false; }

    const xDifference = position.x - character.x;
    const yDifference = position.y - character.y;
    const xCollision = xDifference < character.width && xDifference > -character.width;
    const yCollision = yDifference < character.height && yDifference > -character.height;

    return xCollision && yCollision;
  });
};

const characters = {
  setup: () => {
    characters.characters = Assets.assets.ports.characters.map((character) => new Character(
      Map.buildings[character.spawn.building].x + character.spawn.offset.x,
      Map.buildings[character.spawn.building].y + character.spawn.offset.y,
      character.frame,
      character.isImmobile,
    ));

    characters.player = characters.characters[0];
    characters.npcs = characters.characters.slice(1);
  },
  update() {
    const p = percentNextMove();

    characters.characters.forEach((character) => {
      character.interpolatePosition(p);
    });

    if (p === 1) {
      if (enteredBuilding()) {
        return;
      }

      movePlayer();
      moveNpcs();
    }
  }
};

export default characters;
