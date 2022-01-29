import { useEffect, useState } from 'react';

import { completeQuest, exitBuilding } from '../../../state/actionsPort';
import getQuest from '../../quest';
import {
  CharacterMessage,
  Message,
  MessagePosition,
  questToMessages,
  VendorMessage,
} from '../../../data/questData';

const getLatestCharacterId = (
  step: number,
  messagePosition: MessagePosition,
  messages: Message[],
) => {
  let characterId;

  for (let i = step - 1; i >= 0; i -= 1) {
    if (messages[i].messagePosition === messagePosition) {
      characterId = messages[i].characterId;
      break;
    }
  }

  return characterId;
};

export default function useQuest() {
  const quest = getQuest();

  if (quest === null) {
    return null;
  }

  const [step, setStep] = useState(0);

  const messages = questToMessages[quest];
  const { messagePosition, ...message } = messages[step];

  message.body = message.body
    .replace('$firstName', 'João')
    .replace('$lastName', 'Franco');

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

  let vendor = null;
  let upper = null;
  let lower = null;

  if (messagePosition === 0) {
    vendor = message as VendorMessage;
  } else {
    const latestCharacterId = getLatestCharacterId(step, 0, messages);

    if (latestCharacterId === null) {
      vendor = {
        body: '',
        characterId: null,
      };
    }
  }

  if (messagePosition === 1) {
    upper = message as CharacterMessage;
  } else {
    const latestCharacterId = getLatestCharacterId(step, 1, messages);

    if (latestCharacterId) {
      upper = { body: '', characterId: latestCharacterId };
    }
  }

  if (messagePosition === 2) {
    lower = message as CharacterMessage;
  } else {
    const latestCharacterId = getLatestCharacterId(step, 2, messages);

    if (latestCharacterId) {
      lower = { body: '', characterId: latestCharacterId };
    }
  }

  return {
    vendor,
    upper,
    lower,
  };
}
