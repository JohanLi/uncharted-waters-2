import { useEffect } from 'react';

export default function useCaretDown(next: () => void) {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      next();
    };

    const onKeyup = (e: KeyboardEvent) => {
      const pressedKey = e.key.toLowerCase();

      if (['e', 'enter', 'escape', 'backspace'].includes(pressedKey)) {
        e.preventDefault();
        next();
      }
    };

    const onContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      next();
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
