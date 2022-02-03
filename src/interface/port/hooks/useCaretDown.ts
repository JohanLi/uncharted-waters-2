import { useEffect } from 'react';

export default function useCaretDown(onCaretDown?: () => void) {
  useEffect(() => {
    if (!onCaretDown) {
      return () => {};
    }

    const onClick = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onCaretDown();
    };

    const onKeyup = (e: KeyboardEvent) => {
      const pressedKey = e.key.toLowerCase();

      if (['e', 'enter', 'escape'].includes(pressedKey)) {
        e.preventDefault();
        onCaretDown();
      }
    };

    const onContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      onCaretDown();
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
