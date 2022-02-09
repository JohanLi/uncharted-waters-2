/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */

import React, { useEffect, useState } from 'react';

import MessageBox from './MessageBox';
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
  onCancel: () => void;
  title?: string;
  wide?: boolean;
  hidden?: boolean;
}

export default function Menu<T extends number | string>({
  options,
  onSelect,
  onCancel,
  title = '',
  wide = false,
  hidden = false,
}: Props<T>) {
  const [activeIndex, setActiveIndex] = useState(0);

  useCancel(!hidden ? onCancel : undefined);

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

    window.addEventListener('keydown', onKeydown);

    return () => {
      window.removeEventListener('keydown', onKeydown);
    };
  }, [activeIndex, hidden]);

  return (
    <div
      className={hidden ? 'hidden' : ''}
      data-test={`menu${wide ? '2' : ''}`}
    >
      <MessageBox>
        <div className={wide ? 'w-[280px]' : 'w-[208px]'}>
          {Boolean(title) && (
            <div className="text-center text-2xl py-2 mb-4 cursor-pointer bg-orange-200">
              {title}
            </div>
          )}
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
                <div className={wide ? 'pl-4' : 'text-center'}>{label}</div>
              </div>
            );
          })}
        </div>
      </MessageBox>
    </div>
  );
}
