import { Direction } from './types';

export const directions: Direction[] = ['n', 'e', 's', 'w'];

export const sample = <T>(values: T[]): T =>
  values[Math.floor(Math.random() * values.length)];

export const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
