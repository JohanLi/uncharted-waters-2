import { useEffect, useState } from 'react';

import { completeQuest, exitBuilding } from '../../state/actionsPort';
import getAvailableQuest from './getAvailableQuest';
import questData from './questData';
import messagesAtStep from './messagesAtStep';

export default function useQuest() {
  const quest = getAvailableQuest();

  if (quest === null) {
    return null;
  }

  const [step, setStep] = useState(0);

  const messages = questData[quest];

  useEffect(() => {
    const next = () => {
      if (step >= messages.length - 1) {
        completeQuest(quest);
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

  return messagesAtStep(messages, step);
}
