import { Direction, Position } from './types';

export const directions: Direction[] = ['n', 'e', 's', 'w'];

export const sample = <T>(values: T[]): T =>
  values[Math.floor(Math.random() * values.length)];

export const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const applyPositionDelta = (p1: Position, p2: Position) => ({
  x: p1.x + p2.x,
  y: p1.y + p2.y,
});
