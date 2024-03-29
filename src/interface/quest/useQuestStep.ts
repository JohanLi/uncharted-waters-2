import { useRef, useState } from 'react';

import getAvailableQuest from './getAvailableQuest';
import questData, { Message } from './questData';
import getMessageBoxes from './getMessageBoxes';
import { completeQuest, exitBuilding } from '../../state/actionsPort';
import updateInterface from '../../state/updateInterface';

export const acknowledge = (message: Pick<Message, 'confirm'> | null) =>
  Boolean(message && message.confirm === undefined);

export default function useQuestStep() {
  const [step, setStep] = useState(0);

  const { current: availableQuest } = useRef(getAvailableQuest());

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

    if (message.fadeBeforeNext) {
      updateInterface.fade(() => setStep(step + 1));
      return;
    }

    // TODO investigate if the early return is still needed, seeing as we also have exitBuildingIfNotLodge()
    if (message.exitBuilding) {
      exitBuilding();
      return;
    }

    setStep(step + 1);
  };

  const messageBoxes = getMessageBoxes(messages, step);
  const currentMessageBox = messageBoxes[message.position];

  if (currentMessageBox) {
    if (acknowledge(message)) {
      currentMessageBox.acknowledge = next;
    }

    // TODO not the best looking solution
    if (message.confirm) {
      currentMessageBox.confirm = {
        yes: () => {
          message.confirm?.yes();
          next();
        },
        no: () => {
          message.confirm?.no();
          next();
        },
      };
    }
  }

  return { messageBoxes };
}
