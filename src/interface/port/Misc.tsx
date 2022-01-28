import React, { ReactNode, useEffect, useState } from 'react';

import DialogBox from '../common/DialogBox';
import { classNames } from '../interfaceUtils';
import MessageBody, { Message, UpperOrLower } from './MessageBody';
import { exitBuilding } from '../../state/actionsPort';
import BuildingWrapper from './BuildingWrapper';

const messages: Message[] = [
  {
    body: 'Father, did you send for me?',
    characterId: '1',
    upperOrLower: 2,
  },
  {
    body: 'Ah, $firstName, I’ve been wanting to ask you a few questions.',
    characterId: '19',
    upperOrLower: 1,
  },
  {
    body: 'First, has your fencing improved?',
    characterId: '19',
    upperOrLower: 1,
  },
  {
    body: 'Yes, compared to before. But I think I’d be lucky to get just one point out of five if I were fighting you, Father.',
    characterId: '1',
    upperOrLower: 2,
  },
  {
    body: 'And have you studied your sailing lessons?',
    characterId: '19',
    upperOrLower: 1,
  },
  {
    body: 'Well, I finished my studies at school. But I can’t think of anything more useless than an education without practical experience. ',
    characterId: '1',
    upperOrLower: 2,
  },
  {
    body: 'I see. Well then, have you mastered geography?',
    characterId: '19',
    upperOrLower: 1,
  },
  {
    body: 'Well, since I’ve never been allowed to leave Lisbon, I only know what I’ve learned in books.',
    characterId: '1',
    upperOrLower: 2,
  },
  {
    body: '$firstName, don’t knock textbooks. The advice of others can prove to be invaluable.',
    characterId: '19',
    upperOrLower: 1,
  },
  {
    body: 'Yes sir.',
    characterId: '1',
    upperOrLower: 2,
  },
  {
    body: 'Remember that, $firstName. And finally, how’s that lute coming along?',
    characterId: '19',
    upperOrLower: 1,
  },
  {
    body: 'It’s just a hobby, Father. I’m not really good enough to play for audiences.',
    characterId: '1',
    upperOrLower: 2,
  },
  {
    body: 'Really? Your mother has mentioned that you have a fairly good reputation with her friends.',
    characterId: '19',
    upperOrLower: 1,
  },
  {
    body: 'You must be kidding.',
    characterId: '1',
    upperOrLower: 2,
  },
  {
    body: 'Ha, ha, ha. I’ll have to have you play for me sometime.',
    characterId: '19',
    upperOrLower: 1,
  },
  {
    body: 'Anyway $firstName, to get down to business...',
    characterId: '19',
    upperOrLower: 1,
  },
  {
    body: 'Yes sir?',
    characterId: '1',
    upperOrLower: 2,
  },
  {
    body: 'I have something very important to tell you today.',
    characterId: '19',
    upperOrLower: 1,
  },
  {
    body: 'What is it, Father?',
    characterId: '1',
    upperOrLower: 2,
  },
  {
    body: 'As you already know, when I was your age, I was already out on the open seas, fighting pirates and scoundrels.',
    characterId: '19',
    upperOrLower: 1,
  },
  {
    body: 'I have heard the tales. (Here he goes again!)',
    characterId: '1',
    upperOrLower: 2,
  },
  {
    body: 'Up until now, I have forbidden you to leave this harbor, due to your youth and inexperience.',
    characterId: '19',
    upperOrLower: 1,
  },
  {
    body: 'However, the $lastName men cannot live on land forever.',
    characterId: '19',
    upperOrLower: 1,
  },
  {
    body: 'You already have enough knowledge. What you need now is experience.',
    characterId: '19',
    upperOrLower: 1,
  },
  {
    body: 'I want you to search for adventure, to live a life on the edge, like I did.',
    characterId: '19',
    upperOrLower: 1,
  },
  {
    body: 'Yes sir!',
    characterId: '1',
    upperOrLower: 2,
  },
  {
    body: 'Along with that I have an important task for you: Go and find the secret of Atlantis.',
    characterId: '19',
    upperOrLower: 1,
  },
  {
    body: 'The secret of Atlantis? What do you mean?',
    characterId: '1',
    upperOrLower: 2,
  },
  {
    body: 'Well, that’s something you’ll have to discover on your own, son!',
    characterId: '19',
    upperOrLower: 1,
  },
  {
    body: 'It’s a difficult task, and there may be hardships along the way, but it’s urgent that you find it.',
    characterId: '19',
    upperOrLower: 1,
  },
  {
    body: 'Furthermore, I’ve ordered the townspeople to treat you like a commoner from now on, so prepare yourself for that as well.',
    characterId: '19',
    upperOrLower: 1,
  },
  {
    body: 'Your ship is being built even now. You’ll be leaving soon, so you’d better get ready at once. Good luck son, make me proud!',
    characterId: '19',
    upperOrLower: 1,
  },
  {
    body: 'Rocco! Rocco! Where are you?!',
    characterId: '19',
    upperOrLower: 1,
  },
  {
    body: 'Ahoy, sir, I’m right here.',
    characterId: '32',
    upperOrLower: 2,
  },
  {
    body: 'I’m leaving you in charge of his education. Teach him how to be a true sailor.',
    characterId: '19',
    upperOrLower: 1,
  },
  {
    body: 'Righto Cap’n, I mean, Duke, sir.',
    characterId: '32',
    upperOrLower: 2,
  },
  {
    body: 'Don’t go easy on him because he’s my son. Forge him into a man, Rocco.',
    characterId: '19',
    upperOrLower: 1,
  },
  {
    body: 'Come along now, swabbie, let’s get to the shipyard.',
    characterId: '32',
    upperOrLower: 2,
  },
  {
    body: 'Righto, Rocco, but first I’ve got to say good-bye to Lucia and Carlotta.',
    characterId: '1',
    upperOrLower: 2,
  },
];

const getLatestCharacterId = (step: number, upperOrLower: UpperOrLower) => {
  let characterId: string | undefined;

  for (let i = step - 1; i >= 0; i -= 1) {
    if (messages[i].upperOrLower === upperOrLower) {
      characterId = messages[i].characterId;
      break;
    }
  }

  return characterId;
};

export default function Misc() {
  const [step, setStep] = useState(0);
  const message = messages[step];

  useEffect(() => {
    const next = () => {
      if (step >= messages.length - 1) {
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
    const latestCharacterId = getLatestCharacterId(step, 1);

    if (latestCharacterId) {
      upper = (
        <MessageBody message={{ body: '', characterId: latestCharacterId }} />
      );
    } else {
      hideUpper = true;
    }
  }

  if (message.upperOrLower !== 2) {
    const latestCharacterId = getLatestCharacterId(step, 2);

    if (latestCharacterId) {
      lower = (
        <MessageBody message={{ body: '', characterId: latestCharacterId }} />
      );
    } else {
      hideLower = true;
    }
  }

  return (
    <BuildingWrapper buildingId="8" vendorMessage={null}>
      <div className="absolute top-0 bottom-0 left-[288px] right-0 p-4">
        <div className={hideUpper ? 'invisible' : ''}>
          <DialogBox className="">{upper}</DialogBox>
        </div>
        <div
          className={classNames(
            'mt-4 ml-[112px]',
            hideLower ? 'invisible' : '',
          )}
        >
          <DialogBox className="">{lower}</DialogBox>
        </div>
      </div>
    </BuildingWrapper>
  );
}
