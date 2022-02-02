import { useState } from 'react';

import getAvailableQuest from './getAvailableQuest';
import questData from './questData';
import getMessageBoxes from './getMessageBoxes';
import { completeQuest, exitBuilding } from '../../state/actionsPort';

export default function useQuestStep() {
  const [step, setStep] = useState(0);

  const availableQuest = getAvailableQuest();

  if (availableQuest === null) {
    return null;
  }

  const messages = questData[availableQuest];
  const message = messages[step];

  if (!message) {
    return null;
  }

  const next = () => {
    if (message.action) {
      message.action();
    }

    if (message.completeQuest) {
      completeQuest(availableQuest);
    }

    if (message.exitBuilding) {
      exitBuilding();
    } else {
      setStep(step + 1);
    }
  };

  return {
    messageBoxes: getMessageBoxes(messages, step),
    next,
  };
}
