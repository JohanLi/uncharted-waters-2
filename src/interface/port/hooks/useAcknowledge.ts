import { useEffect } from 'react';

export default function useAcknowledge(onAcknowledge?: () => void) {
  useEffect(() => {
    if (!onAcknowledge) {
      return () => {};
    }

    const onClick = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onAcknowledge();
    };

    const onKeyup = (e: KeyboardEvent) => {
      const pressedKey = e.key.toLowerCase();

      if (['e', 'enter', 'escape'].includes(pressedKey)) {
        e.preventDefault();
        onAcknowledge();
      }
    };

    const onContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      onAcknowledge();
    };

    window.addEventListener('click', onClick);
    window.addEventListener('keyup', onKeyup);
    window.addEventListener('contextmenu', onContextMenu);

    return () => {
      window.removeEventListener('click', onClick);
      window.removeEventListener('keyup', onKeyup);
      window.removeEventListener('contextmenu', onContextMenu);
    };
  });
}
