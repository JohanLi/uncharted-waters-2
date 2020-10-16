import { Direction } from './types';

export const directions: Direction[] = ['n', 'e', 's', 'w'];

export const sample = <T>(values: T[]): T => values[Math.floor(Math.random() * values.length)];
