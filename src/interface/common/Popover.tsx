/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { Fragment, ReactNode, useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';

import { classNames } from '../interfaceUtils';

interface Props {
  label: string;
  children: ReactNode;
}

export default function Popover({ label, children }: Props) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      const pressedKey = e.key.toLowerCase();

      if (pressedKey === 'escape') {
        e.preventDefault();
        setActive(false);
      }
    };

    const onContextmenu = (e: MouseEvent) => {
      e.preventDefault();
      setActive(false);
    };

    window.addEventListener('keydown', onKeydown);
    window.addEventListener('contextmenu', onContextmenu);

    return () => {
      window.removeEventListener('keydown', onKeydown);
      window.removeEventListener('contextmenu', onContextmenu);
    };
  });

  return (
    <>
      <Transition
        show={active}
        as={Fragment}
        enter="ease-out duration-150"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className="fixed inset-0 bg-black bg-opacity-75 transition-opacity z-10"
          onClick={() => setActive(false)}
        />
      </Transition>
      <div
        className={classNames(
          'relative cursor-pointer p-5 text-right hover:bg-gray-800',
          active ? 'bg-gray-800' : '',
        )}
        onClick={() => setActive(true)}
      >
        {label}
        {active && (
          <div className="absolute left-full bottom-1/2 translate-y-1/2 z-20 rounded-lg shadow-xl overflow-hidden">
            {children}
          </div>
        )}
      </div>
    </>
  );
}
