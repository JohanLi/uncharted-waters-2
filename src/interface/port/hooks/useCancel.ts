import { useEffect } from 'react';

export default function useCancel(onCancel: () => void, active = true) {
  useEffect(() => {
    if (!active) {
      return () => {};
    }

    const onKeyup = (e: KeyboardEvent) => {
      const pressedKey = e.key.toLowerCase();

      if (pressedKey === 'escape') {
        e.preventDefault();
        onCancel();
      }
    };

    const onContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      onCancel();
    };

    window.addEventListener('keyup', onKeyup);
    window.addEventListener('contextmenu', onContextMenu);

    return () => {
      window.removeEventListener('keyup', onKeyup);
      window.removeEventListener('contextmenu', onContextMenu);
    };
  });
}
