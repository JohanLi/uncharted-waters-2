import { useEffect } from 'react';

export default function useAcknowledge(
  onAcknowledge: (() => void) | undefined,
  element: HTMLDivElement | null,
) {
  useEffect(() => {
    if (!onAcknowledge || !element) {
      return undefined;
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

    element.addEventListener('click', onClick);
    element.addEventListener('contextmenu', onContextMenu);

    window.addEventListener('keyup', onKeyup);

    return () => {
      element.removeEventListener('click', onClick);
      element.removeEventListener('contextmenu', onContextMenu);

      window.removeEventListener('keyup', onKeyup);
    };
  });
}
