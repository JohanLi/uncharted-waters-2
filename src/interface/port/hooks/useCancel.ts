import { useEffect } from 'react';

export default function useCancel(onCancel?: () => void) {
  useEffect(() => {
    if (!onCancel) {
      return undefined;
    }

    const onKeydown = (e: KeyboardEvent) => {
      const pressedKey = e.key.toLowerCase();

      if (pressedKey === 'escape') {
        e.preventDefault();
        onCancel();
      }
    };

    const onContextMenu = () => {
      onCancel();
    };

    window.addEventListener('keydown', onKeydown);
    window.addEventListener('contextmenu', onContextMenu);

    return () => {
      window.removeEventListener('keydown', onKeydown);
      window.removeEventListener('contextmenu', onContextMenu);
    };
  });
}
