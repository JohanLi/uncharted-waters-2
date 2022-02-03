import { useState } from 'react';

import getAvailableQuest from './getAvailableQuest';
import questData, { Message } from './questData';
import getMessageBoxes from './getMessageBoxes';
import { completeQuest, exitBuilding } from '../../state/actionsPort';

export const showCaretDown = (message: Pick<Message, 'confirm'> | null) =>
  Boolean(message && message.confirm === undefined);

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

  const messageBoxes = getMessageBoxes(messages, step);
  const currentMessageBox = messageBoxes[message.position];

  if (showCaretDown(message) && currentMessageBox) {
    currentMessageBox.showCaretDown = next;
  }

  return { messageBoxes };
}
