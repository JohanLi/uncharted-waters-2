import React, { ReactNode, useEffect, useState } from 'react';

import { completeQuest, exitBuilding } from '../../state/actionsPort';
import MessageBody, { Message, UpperOrLower } from './MessageBody';
import DialogBox from '../common/DialogBox';
import { classNames } from '../interfaceUtils';
import getQuest from '../quest';
import { questToMessages } from '../../data/questData';

const getLatestCharacterId = (
  step: number,
  upperOrLower: UpperOrLower,
  messages: Message[],
) => {
  let characterId: string | undefined;

  for (let i = step - 1; i >= 0; i -= 1) {
    if (messages[i].upperOrLower === upperOrLower) {
      characterId = messages[i].characterId;
      break;
    }
  }

  return characterId;
};

export default function Quest() {
  const quest = getQuest();

  if (quest === null) {
    return null;
  }

  const messages = questToMessages[quest];

  const [step, setStep] = useState(0);
  const message = messages[step];

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

  let upper: ReactNode = <MessageBody message={message} />;
  let lower: ReactNode = <MessageBody message={message} />;
  let hideUpper = false;
  let hideLower = false;

  if (message.upperOrLower !== 1) {
    const latestCharacterId = getLatestCharacterId(step, 1, messages);

    if (latestCharacterId) {
      upper = (
        <MessageBody message={{ body: '', characterId: latestCharacterId }} />
      );
    } else {
      hideUpper = true;
    }
  }

  if (message.upperOrLower !== 2) {
    const latestCharacterId = getLatestCharacterId(step, 2, messages);

    if (latestCharacterId) {
      lower = (
        <MessageBody message={{ body: '', characterId: latestCharacterId }} />
      );
    } else {
      hideLower = true;
    }
  }

  return (
    <div className="absolute top-0 left-[288px] p-4">
      <div className={hideUpper ? 'invisible' : ''}>
        <DialogBox className="">{upper}</DialogBox>
      </div>
      <div
        className={classNames('mt-4 ml-[112px]', hideLower ? 'invisible' : '')}
      >
        <DialogBox className="">{lower}</DialogBox>
      </div>
    </div>
  );
}
