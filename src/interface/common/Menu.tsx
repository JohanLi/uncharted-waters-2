/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */

// TODO solve issue with multiple Menus being visible (Item Popover while in a building)

import React, { useEffect, useState } from 'react';

import { classNames } from '../interfaceUtils';
import useCancel from '../port/hooks/useCancel';

export interface Option<T> {
  label: string;
  value: T;
  disabled?: boolean;
}

interface Props<T> {
  options: Option<T>[];
  onSelect: (value: T) => void;
  onCancel?: () => void;
  onActiveIndex?: (index: number) => void;
  hidden?: boolean;
  center?: boolean;
}

export default function Menu<T extends number | string>({
  options,
  onSelect,
  onCancel,
  onActiveIndex,
  hidden = false,
  center = false,
}: Props<T>) {
  const [activeIndex, setActiveIndex] = useState(0);

  useCancel(!hidden ? onCancel : undefined);

  useEffect(() => {
    if (onActiveIndex) {
      onActiveIndex(activeIndex);
    }
  }, [activeIndex]);

  useEffect(() => {
    if (hidden) {
      return undefined;
    }

    const onKeydown = (e: KeyboardEvent) => {
      const pressedKey = e.key.toLowerCase();

      if (['e', 'enter'].includes(pressedKey)) {
        if (!options[activeIndex].disabled) {
          onSelect(options[activeIndex].value);
        }

        e.preventDefault();
        return;
      }

      let newActiveIndex = activeIndex;

      if (['s', 'arrowdown'].includes(pressedKey)) {
        newActiveIndex += 1;
        e.preventDefault();
      }

      if (['w', 'arrowup'].includes(pressedKey)) {
        newActiveIndex -= 1;
        e.preventDefault();
      }

      if (newActiveIndex >= options.length) {
        newActiveIndex = 0;
      }

      if (newActiveIndex < 0) {
        newActiveIndex = options.length - 1;
      }

      setActiveIndex(newActiveIndex);
    };

    window.addEventListener('keydown', onKeydown, true);

    return () => {
      window.removeEventListener('keydown', onKeydown, true);
    };
  }, [activeIndex, hidden]);

  return (
    <>
      {options.map(({ label, value, disabled }, i) => {
        let buttonClass = '';

        if (activeIndex === i) {
          if (disabled) {
            buttonClass = 'bg-black text-gray-400';
          } else {
            buttonClass = 'bg-black text-white';
          }
        } else if (disabled) {
          buttonClass = 'text-gray-400';
        } else {
          buttonClass = 'text-black';
        }

        return (
          <div
            key={value}
            className={classNames(
              'text-2xl py-1 my-2 cursor-pointer',
              buttonClass,
            )}
            onClick={() => {
              setActiveIndex(i);

              if (!options[i].disabled) {
                onSelect(value);
              }
            }}
            role="button"
          >
            <div className={!center ? 'pl-4' : 'text-center'}>{label}</div>
          </div>
        );
      })}
    </>
  );
}
