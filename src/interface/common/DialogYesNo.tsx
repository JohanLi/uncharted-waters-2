import React, { useEffect, useState, useRef } from 'react';
import throttle from 'lodash.throttle';

import Assets from '../../assets';
import { Position } from '../../types';

const ON_MOUSE_MOVE_THROTTLE = 20;
const PARENT_WIDTH = 1280;
const PARENT_HEIGHT = 800;

interface Props {
  onSelected: (selected: boolean) => void;
  initialPosition: Position;
}

export default function DialogYesNo({ onSelected, initialPosition }: Props) {
  const [yesOrNo, setYesOrNo] = useState(true);
  const yesOrNoElement = useRef<HTMLDivElement>(null);
  const lastMousePosition = useRef<Position | undefined>(undefined);

  useEffect(() => {
    const onKeyup = (e: KeyboardEvent) => {
      const pressedKey = e.key.toLowerCase();

      if (['a', 'd', 'arrowleft', 'arrowright'].includes(pressedKey)) {
        e.preventDefault();
        setYesOrNo(!yesOrNo);
      }

      if (['e', 'enter'].includes(pressedKey)) {
        e.preventDefault();
        onSelected(yesOrNo);
      }
    };

    /*
      https://stackoverflow.com/questions/7398290/unable-to-understand-usecapture-parameter-in-addeventlistener/7398447
      Right-clicks normally go back 1 step, but not always when such a dialog
      is presented. Setting useCapture = true with stopPropagation stops the
      parent’s step logic.
     */
    const onContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onSelected(false);
    };

    window.addEventListener('keyup', onKeyup);
    window.addEventListener('contextmenu', onContextMenu, true);

    return () => {
      window.removeEventListener('keyup', onKeyup);
      window.removeEventListener('contextmenu', onContextMenu, true);
    };
  }, [yesOrNo]);

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
      className="absolute select-none"
      ref={yesOrNoElement}
      style={{ top: initialPosition.y, left: initialPosition.x }}
    >
      <div className="relative">
        <img
          className="w-72 h-28"
          src={
            yesOrNo
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
            setYesOrNo(true);
            onSelected(true);
          }}
          role="button"
        />
        <div
          className="absolute top-8 left-[148px] w-[120px] h-16 cursor-pointer"
          onClick={() => {
            setYesOrNo(false);
            onSelected(false);
          }}
          role="button"
        />
      </div>
    </div>
  );
}
