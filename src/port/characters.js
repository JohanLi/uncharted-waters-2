import Data from './data';
import State from '../state';
import Character from './character';
import Input from './input';
import Map from './map';

let characters = [];

const checkSpawn = () => {
  if (characters.length === 0) {
    spawnCharacters([playerId()]);
  }

  if (characters.length === 1 && State.timeOfDay() !== 'night') {
    spawnCharacters(npcIds());
  }

  if (characters.length > 1 && State.timeOfDay() === 'night') {
    removeNpcs();
  }
};

const playerId = () => Object.keys(Data.characters).find(id => Data.characters[id].isPlayer);
const npcIds = () => Object.keys(Data.characters).filter(id => !Data.characters[id].isPlayer);

const spawnCharacters = (ids) => {
  ids.forEach((npcId) => {
    const {
      spawn,
      startFrame,
      isPlayer = false,
      isImmobile = false,
    } = Data.characters[npcId];
    const building = Data.ports[State.portId].buildings[spawn.building];

    characters.push(
      Character({
        x: building.x + spawn.offset.x,
        y: building.y + spawn.offset.y,
        startFrame,
        isPlayer,
        isImmobile,
      }),
    );
  });
};

const removeNpcs = () => {
  characters = characters.filter(character => character.isPlayer);
};

const collision = (position, character) => Map.collisionAt(position)
  || Map.outOfBoundsAt(position)
  || collisionWith(position, character);

const collisionWith = (position, self) => characters.some((character) => {
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
  const player = Characters.player();
  const id = Map.buildingAt(player.destination());

  if (id) {
    State.enterBuilding(id);
    player.update();
    player.move('s', false);
    return true;
  }

  return false;
};

const Characters = {
  setup() {
    characters = [];
  },
  update() {
    checkSpawn();

    if (enteredBuilding()) {
      return;
    }

    characters.forEach((character) => {
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
  characters() {
    return characters;
  },
  player() {
    return characters.find(character => character.isPlayer);
  },
};

export default Characters;
