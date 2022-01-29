import { useEffect, useState } from 'react';

import getAvailableQuest from './getAvailableQuest';
import questData from './questData';
import messagesAtStep from './messagesAtStep';
import { completeQuest, exitBuilding } from '../../state/actionsPort';

export default function useQuest() {
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
      if (message.action) {
        message.action();
      }

      if (message.completeQuest) {
        completeQuest(quest);
      }

      if (message.exitBuilding) {
        exitBuilding();
      } else {
        setStep(step + 1);
      }
    };

    const onClick = () => {
      next();
    };

    const onKeyup = (e: KeyboardEvent) => {
      const pressedKey = e.key.toLowerCase();

      if (!['enter', 'e'].includes(pressedKey)) {
        return;
      }

      e.preventDefault();
      next();
    };

    window.addEventListener('click', onClick);
    window.addEventListener('keyup', onKeyup);

    return () => {
      window.removeEventListener('click', onClick);
      window.removeEventListener('keyup', onKeyup);
    };
  }, [step]);

  if (!message) {
    return null;
  }

  return messagesAtStep(messages, step);
}
