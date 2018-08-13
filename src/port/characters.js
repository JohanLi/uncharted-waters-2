import Data from './data';
import State from '../state';
import Character from './character';
import Input from './input';
import Map from './map';

const collision = (position, character) => Map.collisionAt(position)
  || Map.outOfBoundsAt(position)
  || collisionWith(position, character);

const collisionWith = (position, self) => characters.characters.some((character) => {
  if (character === self) {
    return false;
  }

  const { x, y } = character.destination();

  const distanceX = Math.abs(position.x - x);
  const distanceY = Math.abs(position.y - y);

  return distanceX < 2 && distanceY < 2;
});

const alternativeDirection = (direction, character) => {
  let firstDirectionPossible = true;
  let secondDirectionPossible = true;

  for (let i = 1; i <= 19; i += 1) {
    const destinations = alternativeDestinations(direction, character.position())(i);

    if (firstDirectionPossible) {
      if (collision(destinations[0].step1, character)) {
        firstDirectionPossible = false;
      } else if (!collision(destinations[0].step2, character)) {
        return destinations[0].direction;
      }
    }

    if (secondDirectionPossible) {
      if (collision(destinations[1].step1, character)) {
        secondDirectionPossible = false;
      } else if (!collision(destinations[1].step2, character)) {
        return destinations[1].direction;
      }
    }
  }

  return '';
};

const alternativeDestinations = (direction, position) => {
  if (direction === 'n' || direction === 's') {
    const secondStepY = direction === 'n' ? position.y - 1 : position.y + 1;

    return i => [
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

    return i => [
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

const enteredBuilding = () => {
  const id = Map.buildingAt(characters.player().destination());

  if (id) {
    State.enterBuilding(id);
    characters.player().update();
    characters.player().move('s', false);
    return true;
  }

  return false;
};

const characters = {
  setup() {
    characters.characters = Object.keys(Data.characters).map((id) => {
      const {
        spawn,
        startFrame,
        isPlayer = false,
        isImmobile = false,
      } = Data.characters[id];
      const building = Data.ports[State.portId].buildings[spawn.building];

      return Character({
        x: building.x + spawn.offset.x,
        y: building.y + spawn.offset.y,
        startFrame,
        isPlayer,
        isImmobile,
      });
    });
  },
  update() {
    if (enteredBuilding()) {
      return;
    }

    characters.characters.forEach((character) => {
      character.update();

      let direction;

      if (character.isPlayer) {
        ({ direction } = Input);
      } else if (!character.isImmobile) {
        direction = character.randomDirection();
      }

      const hasMoved = character.move(direction);

      if (hasMoved && collision(character.destination(), character)) {
        character.undoMove();

        if (character.isPlayer) {
          const newDirection = alternativeDirection(direction, character);
          character.move(newDirection, false);
        }
      }
    });
  },
  player() {
    return characters.characters.find(character => character.isPlayer);
  },
};

export default characters;
