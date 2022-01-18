import type { Ship } from './fleets';
import { Position } from '../types';

export const getHeadingWindDelta = (d1: number, d2: number) => {
  const delta = Math.abs(d1 - d2);

  if (delta > 4) {
    return 8 - delta;
  }

  return delta;
};

export const hasOars = (ship: Ship) => ship.id >= 19;

export const calculateDestination = (
  position: Position,
  xDelta: number,
  yDelta: number,
  multiplier: number,
  collisionAt: (position: Position) => boolean,
) => {
  const destination = {
    x: position.x + xDelta * multiplier,
    y: position.y + yDelta * multiplier,
  };

  if (xDelta === 1) {
    const xNext = Math.ceil(destination.x);
    const y = Math.floor(position.y);

    const upperOrMiddleCollision = collisionAt({ x: xNext, y });
    const lowerCollision =
      position.y % 1 === 0 ? false : collisionAt({ x: xNext, y: y + 1 });
    const collision = upperOrMiddleCollision || lowerCollision;

    if (!collision) {
      return destination;
    }

    const yNextUpper = Math.ceil(position.y) - 1;
    const yNextLower = Math.floor(position.y) + 1;

    const upperAlternativeDestination = !collisionAt({
      x: xNext,
      y: yNextUpper,
    });
    const lowerAlternativeDestination = !collisionAt({
      x: xNext,
      y: yNextLower,
    });

    if (upperAlternativeDestination) {
      const xNextExcess = destination.x - (xNext - 1);
      const yNextNeed = position.y - yNextUpper;
      const remainingMovement = xNextExcess - yNextNeed;

      if (remainingMovement >= 0) {
        destination.y = yNextUpper;
        destination.x = xNext - 1 + remainingMovement;
      } else {
        destination.y -= xNextExcess;
        destination.x -= xNextExcess;
      }
    } else if (lowerAlternativeDestination) {
      const xNextExcess = destination.x - (xNext - 1);
      const yNextNeed = yNextLower - position.y;
      const remainingMovement = xNextExcess - yNextNeed;

      if (remainingMovement >= 0) {
        destination.y = yNextLower;
        destination.x = xNext - 1 + remainingMovement;
      } else {
        destination.y += xNextExcess;
        destination.x -= xNextExcess;
      }
    } else {
      destination.x = Math.min(destination.x, xNext - 1);
    }
  } else if (xDelta === -1) {
    const xNext = Math.floor(destination.x);
    const y = Math.floor(position.y);

    const upperOrMiddleCollision = collisionAt({ x: xNext, y });
    const lowerCollision =
      position.y % 1 === 0 ? false : collisionAt({ x: xNext, y: y + 1 });
    const collision = upperOrMiddleCollision || lowerCollision;

    if (!collision) {
      return destination;
    }

    const yNextUpper = Math.ceil(position.y) - 1;
    const yNextLower = Math.floor(position.y) + 1;

    const upperAlternativeDestination = !collisionAt({
      x: xNext,
      y: yNextUpper,
    });
    const lowerAlternativeDestination = !collisionAt({
      x: xNext,
      y: yNextLower,
    });

    if (upperAlternativeDestination) {
      const xNextExcess = xNext + 1 - destination.x;
      const yNextNeed = position.y - yNextUpper;
      const remainingMovement = xNextExcess - yNextNeed;

      if (remainingMovement >= 0) {
        destination.y = yNextUpper;
        destination.x = xNext + 1 - remainingMovement;
      } else {
        destination.y -= xNextExcess;
        destination.x += xNextExcess;
      }
    } else if (lowerAlternativeDestination) {
      const xNextExcess = xNext + 1 - destination.x;
      const yNextNeed = yNextLower - position.y;
      const remainingMovement = xNextExcess - yNextNeed;

      if (remainingMovement >= 0) {
        destination.y = yNextLower;
        destination.x = xNext + 1 - remainingMovement;
      } else {
        destination.y += xNextExcess;
        destination.x += xNextExcess;
      }
    } else {
      destination.x = Math.max(destination.x, xNext + 1);
    }
  } else if (yDelta === -1) {
    const yNext = Math.floor(destination.y);
    const x = Math.floor(position.x);

    const leftOrMiddleCollision = collisionAt({ x, y: yNext });
    const rightCollision =
      position.x % 1 === 0 ? false : collisionAt({ x: x + 1, y: yNext });
    const collision = leftOrMiddleCollision || rightCollision;

    if (!collision) {
      return destination;
    }

    const xNextLeft = Math.ceil(position.x) - 1;
    const xNextRight = Math.floor(position.x) + 1;

    const leftAlternativeDestination = !collisionAt({ x: xNextLeft, y: yNext });
    const rightAlternativeDestination = !collisionAt({
      x: xNextRight,
      y: yNext,
    });

    if (leftAlternativeDestination) {
      const yNextExcess = yNext + 1 - destination.y;
      const xNextNeed = position.x - xNextLeft;
      const remainingMovement = yNextExcess - xNextNeed;

      if (remainingMovement >= 0) {
        destination.x = xNextLeft;
        destination.y = yNext + 1 - remainingMovement;
      } else {
        destination.x -= yNextExcess;
        destination.y += yNextExcess;
      }
    } else if (rightAlternativeDestination) {
      const yNextExcess = yNext + 1 - destination.y;
      const xNextNeed = xNextRight - position.x;
      const remainingMovement = yNextExcess - xNextNeed;

      if (remainingMovement >= 0) {
        destination.x = xNextRight;
        destination.y = yNext + 1 - remainingMovement;
      } else {
        destination.x += yNextExcess;
        destination.y += yNextExcess;
      }
    } else {
      destination.y = Math.max(destination.y, yNext + 1);
    }
  } else if (yDelta === 1) {
    const yNext = Math.ceil(destination.y);
    const x = Math.floor(position.x);

    const leftOrMiddleCollision = collisionAt({ x, y: yNext });
    const rightCollision =
      position.x % 1 === 0 ? false : collisionAt({ x: x + 1, y: yNext });
    const collision = leftOrMiddleCollision || rightCollision;

    if (!collision) {
      return destination;
    }

    const xNextLeft = Math.ceil(position.x) - 1;
    const xNextRight = Math.floor(position.x) + 1;

    const leftAlternativeDestination = !collisionAt({ x: xNextLeft, y: yNext });
    const rightAlternativeDestination = !collisionAt({
      x: xNextRight,
      y: yNext,
    });

    if (leftAlternativeDestination) {
      const yNextExcess = destination.y - (yNext - 1);
      const xNextNeed = position.x - xNextLeft;
      const remainingMovement = yNextExcess - xNextNeed;

      if (remainingMovement >= 0) {
        destination.x = xNextLeft;
        destination.y = yNext - 1 + remainingMovement;
      } else {
        destination.x -= yNextExcess;
        destination.y -= yNextExcess;
      }
    } else if (rightAlternativeDestination) {
      const yNextExcess = destination.y - (yNext - 1);
      const xNextNeed = xNextRight - position.x;
      const remainingMovement = yNextExcess - xNextNeed;

      if (remainingMovement >= 0) {
        destination.x = xNextRight;
        destination.y = yNext - 1 + remainingMovement;
      } else {
        destination.x += yNextExcess;
        destination.y -= yNextExcess;
      }
    } else {
      destination.y = Math.min(destination.y, yNext - 1);
    }
  }

  return destination;
};
