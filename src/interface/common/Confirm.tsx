/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { useEffect, useState, useRef } from 'react';
import throttle from 'lodash.throttle';

import Assets from '../../assets';
import { Position } from '../../types';
import useCancel from '../port/hooks/useCancel';

// e.g., if Yes is highlighted but the user clicks No
const SUBMIT_DELAY_IF_NOT_HIGHLIGHTED = 50;

const ON_MOUSE_MOVE_THROTTLE = 20;
const PARENT_WIDTH = 1280;
const PARENT_HEIGHT = 800;

interface Props {
  onYes: () => void;
  onNo: () => void;
  initialPosition: Position;
}

export default function Confirm({ onYes, onNo, initialPosition }: Props) {
  const [yesHighlighted, setYesHighlighted] = useState(true);
  const yesOrNoElement = useRef<HTMLDivElement>(null);
  const lastMousePosition = useRef<Position | undefined>(undefined);

  useCancel(onNo);

  const [delayedValueToSubmit, setDelayedValueToSubmit] = useState<boolean>();

  useEffect(() => {
    if (delayedValueToSubmit === undefined) {
      return () => {};
    }

    const timer = setTimeout(() => {
      if (delayedValueToSubmit) {
        onYes();
      } else {
        onNo();
      }
    }, SUBMIT_DELAY_IF_NOT_HIGHLIGHTED);

    return () => {
      clearTimeout(timer);
    };
  }, [delayedValueToSubmit]);

  useEffect(() => {
    const onKeyup = (e: KeyboardEvent) => {
      const pressedKey = e.key.toLowerCase();

      if (['a', 'd', 'arrowleft', 'arrowright'].includes(pressedKey)) {
        e.preventDefault();
        setYesHighlighted(!yesHighlighted);
      }

      if (['e', 'enter'].includes(pressedKey)) {
        e.preventDefault();

        setDelayedValueToSubmit(undefined);

        if (yesHighlighted) {
          onYes();
        } else {
          onNo();
        }
      }
    };

    window.addEventListener('keyup', onKeyup);

    return () => {
      window.removeEventListener('keyup', onKeyup);
    };
  }, [yesHighlighted]);

  const onMouseMove = throttle((e: MouseEvent) => {
    if (!lastMousePosition.current || !yesOrNoElement.current) {
      return;
    }

    const { clientX: x, clientY: y } = e;

    const delta = {
      x: lastMousePosition.current.x - x,
      y: lastMousePosition.current.y - y,
    };

    lastMousePosition.current = { x, y };

    let top = yesOrNoElement.current.offsetTop - delta.y;
    let left = yesOrNoElement.current.offsetLeft - delta.x;

    if (top < 0) {
      top = 0;
      lastMousePosition.current = undefined;
    }

    if (left < 0) {
      left = 0;
      lastMousePosition.current = undefined;
    }

    const maxTop = PARENT_HEIGHT - yesOrNoElement.current.offsetHeight;
    const maxLeft = PARENT_WIDTH - yesOrNoElement.current.offsetWidth;

    if (top > maxTop) {
      top = maxTop;
      lastMousePosition.current = undefined;
    }

    if (left > maxLeft) {
      left = maxLeft;
      lastMousePosition.current = undefined;
    }

    yesOrNoElement.current.style.top = `${top}px`;
    yesOrNoElement.current.style.left = `${left}px`;
  }, ON_MOUSE_MOVE_THROTTLE);

  const onMouseUp = () => {
    lastMousePosition.current = undefined;
  };

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <div
      className="absolute z-10"
      ref={yesOrNoElement}
      style={{ top: initialPosition.y, left: initialPosition.x }}
    >
      <div className="relative">
        <img
          className="w-72 h-28"
          src={
            yesHighlighted
              ? Assets.images.dialogYes.toDataURL()
              : Assets.images.dialogNo.toDataURL()
          }
          alt=""
        />
        <div
          className="absolute top-0 left-0 right-0 h-7 cursor-move"
          onMouseDown={(e: React.MouseEvent) => {
            const { clientX: x, clientY: y } = e;

            lastMousePosition.current = { x, y };
          }}
        />
        <div
          className="absolute top-8 left-5 w-[120px] h-16 cursor-pointer"
          onClick={() => {
            if (yesHighlighted) {
              setDelayedValueToSubmit(undefined);
              onYes();
            } else {
              setYesHighlighted(true);
              setDelayedValueToSubmit(true);
            }
          }}
          role="button"
        />
        <div
          className="absolute top-8 left-[148px] w-[120px] h-16 cursor-pointer"
          onClick={() => {
            if (!yesHighlighted) {
              setDelayedValueToSubmit(undefined);
              onNo();
            } else {
              setYesHighlighted(false);
              setDelayedValueToSubmit(false);
            }
          }}
          role="button"
        />
      </div>
    </div>
  );
}
