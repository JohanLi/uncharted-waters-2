import { useEffect, useState } from 'react';

import getAvailableQuest from './getAvailableQuest';
import questData from './questData';
import messagesAtStep from './messagesAtStep';
import { completeQuest, exitBuilding } from '../../state/actionsPort';

export default function useQuestStep() {
  const quest = getAvailableQuest();

  if (quest === null) {
    return null;
  }

  const [step, setStep] = useState(0);

  const messages = questData[quest];
  const message = messages[step];

  useEffect(() => {
    if (!message) {
      return () => {};
    }

    const next = () => {
      const { sideEffects } = message;

      if (!sideEffects) {
        setStep(step + 1);
        return;
      }

      if (sideEffects.action) {
        sideEffects.action();
      }

      if (sideEffects.completeQuest) {
        completeQuest(quest);
      }

      if (sideEffects.exitBuilding) {
        exitBuilding();
      }
    };

    const onClick = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      next();
    };

    const onKeyup = (e: KeyboardEvent) => {
      const pressedKey = e.key.toLowerCase();

      if (['e', 'enter', 'escape', 'backspace'].includes(pressedKey)) {
        e.preventDefault();
        e.stopPropagation();
        next();
      }
    };

    const onContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      next();
    };

    window.addEventListener('click', onClick, true);
    window.addEventListener('keyup', onKeyup, true);
    window.addEventListener('contextmenu', onContextMenu, true);

    return () => {
      window.removeEventListener('click', onClick, true);
      window.removeEventListener('keyup', onKeyup, true);
      window.removeEventListener('contextmenu', onContextMenu, true);
    };
  }, [step]);

  if (!message) {
    return null;
  }

  return messagesAtStep(messages, step);
}
