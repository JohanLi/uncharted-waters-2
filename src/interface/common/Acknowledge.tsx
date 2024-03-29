/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { useEffect } from 'react';

interface Props {
  onAcknowledge: (() => void) | undefined;
}

export default function Acknowledge({ onAcknowledge }: Props) {
  useEffect(() => {
    if (!onAcknowledge) {
      return undefined;
    }

    const onKeydown = (e: KeyboardEvent) => {
      const pressedKey = e.key.toLowerCase();

      if (['e', 'enter', 'escape'].includes(pressedKey)) {
        e.preventDefault();
        onAcknowledge();
      }
    };

    window.addEventListener('keydown', onKeydown);

    return () => {
      window.removeEventListener('keydown', onKeydown);
    };
  });

  if (!onAcknowledge) {
    return null;
  }

  const onClickOrContextMenu = () => {
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
