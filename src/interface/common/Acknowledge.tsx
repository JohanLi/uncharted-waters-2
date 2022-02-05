/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { useEffect, MouseEvent } from 'react';

interface Props {
  onAcknowledge: (() => void) | undefined;
}

export default function Acknowledge({ onAcknowledge }: Props) {
  useEffect(() => {
    if (!onAcknowledge) {
      return undefined;
    }

    const onKeyup = (e: KeyboardEvent) => {
      const pressedKey = e.key.toLowerCase();

      if (['e', 'enter', 'escape'].includes(pressedKey)) {
        e.preventDefault();
        onAcknowledge();
      }
    };

    window.addEventListener('keyup', onKeyup);

    return () => {
      window.removeEventListener('keyup', onKeyup);
    };
  });

  if (!onAcknowledge) {
    return null;
  }

  const onClickOrContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    onAcknowledge();
  };

  return (
    <div
      className="absolute top-0 bottom-0 left-0 right-0 cursor-pointer"
      onClick={onClickOrContextMenu}
      onContextMenu={onClickOrContextMenu}
    />
  );
}
