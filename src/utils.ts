import { nanoid } from 'nanoid';

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

export const generateId = () => nanoid(6);

/*
 This allows us to infer an object’s keys, while defining the type of the values
 at the same time. Slight modification from the answers posted here:
 https://stackoverflow.com/questions/54598322/how-to-make-typescript-infer-the-keys-of-an-object-but-define-type-of-its-value

 TODO check every now and then if there’s a better approach
 */
export const asInferredKeysWithValue =
  <ValueType>() =>
  <InferredKey>(x: {
    [key in keyof InferredKey]: ValueType;
  }) =>
    x;
