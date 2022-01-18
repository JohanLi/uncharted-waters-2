import createWorldPlayer from './worldPlayer';
import { Position } from '../types';

jest.mock('../state/updateInterface', () => ({
  playerFleetDirection: () => {},
  playerFleetSpeed: () => {},
}));

jest.mock('./shipSpeed', () => () => 40);

const collisionAt = (collisionTiles: Position[]) => (position: Position) =>
  collisionTiles.some(
    ({ x, y }) =>
      (position.x === x || position.x + 1 === x) &&
      (position.y === y || position.y + 1 === y),
  );

const expectPositionToBeCloseTo = (p1: Position, p2: Position) => {
  expect(p1.x).toBeCloseTo(p2.x);
  expect(p1.y).toBeCloseTo(p2.y);
};

describe('worldPlayer', () => {
  const byPosition = (position: Position) => {
    const player = createWorldPlayer(position, 0, 'n');

    player.setHeading('n');
    player.updateSpeed();
    return player;
  };

  test('right movement, with no alternative destination', () => {
    const collisionTiles: Position[] = [
      { x: 4, y: 0 },
      { x: 4, y: 1 },
      { x: 4, y: 2 },
      { x: 4, y: 3 },
    ];

    let player = byPosition({ x: 1, y: 1 });
    player.move('e', collisionAt(collisionTiles));
    player.update();
    expect(player.position()).toEqual({ x: 2, y: 1 });
    player.move('e', collisionAt(collisionTiles));
    player.update();
    expect(player.position()).toEqual({ x: 2, y: 1 });

    player = byPosition({ x: 0.9, y: 1 });
    player.move('e', collisionAt(collisionTiles));
    player.update();
    expect(player.position()).toEqual({ x: 1.9, y: 1 });
    player.move('e', collisionAt(collisionTiles));
    player.update();
    expect(player.position()).toEqual({ x: 2, y: 1 });

    player = byPosition({ x: 0.1, y: 1 });
    player.move('e', collisionAt(collisionTiles));
    player.update();
    expect(player.position()).toEqual({ x: 1.1, y: 1 });
    player.move('e', collisionAt(collisionTiles));
    player.update();
    expect(player.position()).toEqual({ x: 2, y: 1 });
  });

  test('right movement, with upper alternative destination', () => {
    const collisionTiles: Position[] = [
      { x: 4, y: 2 },
      { x: 4, y: 3 },
    ];

    let player = byPosition({ x: 1, y: 1 });
    player.move('e', collisionAt(collisionTiles));
    player.update();
    expect(player.position()).toEqual({ x: 2, y: 1 });
    player.move('e', collisionAt(collisionTiles));
    player.update();
    expect(player.position()).toEqual({ x: 2, y: 0 });

    player = byPosition({ x: 2, y: 0.9 });
    player.move('e', collisionAt(collisionTiles));
    player.update();
    expectPositionToBeCloseTo(player.position(), { x: 2.1, y: 0 });

    player = byPosition({ x: 1.9, y: 1 });
    player.move('e', collisionAt(collisionTiles));
    player.update();
    expectPositionToBeCloseTo(player.position(), { x: 2, y: 0.1 });

    player = byPosition({ x: 2, y: 1.1 });
    player.move('e', collisionAt(collisionTiles));
    player.update();
    expect(player.position()).toEqual({ x: 2, y: 1.1 });
  });

  test('right movement, with lower alternative destination', () => {
    const collisionTiles: Position[] = [
      { x: 4, y: 2 },
      { x: 4, y: 3 },
    ];

    let player = byPosition({ x: 1, y: 3 });
    player.move('e', collisionAt(collisionTiles));
    player.update();
    expect(player.position()).toEqual({ x: 2, y: 3 });
    player.move('e', collisionAt(collisionTiles));
    player.update();
    expect(player.position()).toEqual({ x: 2, y: 4 });

    player = byPosition({ x: 2, y: 2.9 });
    player.move('e', collisionAt(collisionTiles));
    player.update();
    expect(player.position()).toEqual({ x: 2, y: 2.9 });

    player = byPosition({ x: 1.9, y: 3.1 });
    player.move('e', collisionAt(collisionTiles));
    player.update();
    expectPositionToBeCloseTo(player.position(), { x: 2, y: 4 });
  });

  test('left movement, with no alternative destination', () => {
    const collisionTiles: Position[] = [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: 0, y: 3 },
    ];

    let player = byPosition({ x: 2, y: 1 });
    player.move('w', collisionAt(collisionTiles));
    player.update();
    expect(player.position()).toEqual({ x: 1, y: 1 });
    player.move('w', collisionAt(collisionTiles));
    player.update();
    expect(player.position()).toEqual({ x: 1, y: 1 });

    player = byPosition({ x: 2.1, y: 1 });
    player.move('w', collisionAt(collisionTiles));
    player.update();
    expect(player.position()).toEqual({ x: 1.1, y: 1 });
    player.move('w', collisionAt(collisionTiles));
    player.update();
    expect(player.position()).toEqual({ x: 1, y: 1 });

    player = byPosition({ x: 2.9, y: 1 });
    player.move('w', collisionAt(collisionTiles));
    player.update();
    expect(player.position()).toEqual({ x: 1.9, y: 1 });
    player.move('w', collisionAt(collisionTiles));
    player.update();
    expect(player.position()).toEqual({ x: 1, y: 1 });
  });

  test('up movement, with right alternative destination', () => {
    const collisionTiles: Position[] = [
      { x: 1, y: 0 },
      { x: 2, y: 0 },
    ];

    let player = byPosition({ x: 2, y: 2 });
    player.move('n', collisionAt(collisionTiles));
    player.update();
    expect(player.position()).toEqual({ x: 2, y: 1 });
    player.move('n', collisionAt(collisionTiles));
    player.update();
    expect(player.position()).toEqual({ x: 3, y: 1 });

    player = byPosition({ x: 1.9, y: 1 });
    player.move('n', collisionAt(collisionTiles));
    player.update();
    expect(player.position()).toEqual({ x: 1.9, y: 1 });

    player = byPosition({ x: 2.1, y: 1 });
    player.move('n', collisionAt(collisionTiles));
    player.update();
    expectPositionToBeCloseTo(player.position(), { x: 3, y: 0.9 });
  });

  test('up movement, with no alternative destination', () => {
    const collisionTiles: Position[] = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
    ];

    let player = byPosition({ x: 1, y: 2 });
    player.move('n', collisionAt(collisionTiles));
    player.update();
    expect(player.position()).toEqual({ x: 1, y: 1 });
    player.move('n', collisionAt(collisionTiles));
    player.update();
    expect(player.position()).toEqual({ x: 1, y: 1 });

    player = byPosition({ x: 1, y: 1.1 });
    player.move('n', collisionAt(collisionTiles));
    player.update();
    expect(player.position()).toEqual({ x: 1, y: 1 });

    player = byPosition({ x: 1, y: 1.9 });
    player.move('n', collisionAt(collisionTiles));
    player.update();
    expect(player.position()).toEqual({ x: 1, y: 1 });
  });

  test('up movement, with left alternative destination', () => {
    const collisionTiles: Position[] = [
      { x: 2, y: 0 },
      { x: 3, y: 0 },
    ];

    let player = byPosition({ x: 1, y: 2 });
    player.move('n', collisionAt(collisionTiles));
    player.update();
    expect(player.position()).toEqual({ x: 1, y: 1 });
    player.move('n', collisionAt(collisionTiles));
    player.update();
    expect(player.position()).toEqual({ x: 0, y: 1 });

    player = byPosition({ x: 0.9, y: 1 });
    player.move('n', collisionAt(collisionTiles));
    player.update();
    expect(player.position()).toEqual({ x: 0, y: 0.9 });

    player = byPosition({ x: 1.1, y: 1 });
    player.move('n', collisionAt(collisionTiles));
    player.update();
    expect(player.position()).toEqual({ x: 1.1, y: 1 });
  });

  test('up movement, with right alternative destination', () => {
    const collisionTiles: Position[] = [
      { x: 1, y: 0 },
      { x: 2, y: 0 },
    ];

    let player = byPosition({ x: 2, y: 2 });
    player.move('n', collisionAt(collisionTiles));
    player.update();
    expect(player.position()).toEqual({ x: 2, y: 1 });
    player.move('n', collisionAt(collisionTiles));
    player.update();
    expect(player.position()).toEqual({ x: 3, y: 1 });

    player = byPosition({ x: 1.9, y: 1 });
    player.move('n', collisionAt(collisionTiles));
    player.update();
    expect(player.position()).toEqual({ x: 1.9, y: 1 });

    player = byPosition({ x: 2.1, y: 1 });
    player.move('n', collisionAt(collisionTiles));
    player.update();
    expectPositionToBeCloseTo(player.position(), { x: 3, y: 0.9 });
  });
});
