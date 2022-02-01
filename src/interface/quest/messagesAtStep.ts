import {
  CharacterMessage,
  Message,
  MessagePosition,
  VendorMessage,
} from './questData';

export type VendorMessageDialog = Pick<VendorMessage, 'body'>;
export type CharacterMessageDialog = Pick<
  CharacterMessage,
  'body' | 'characterId'
>;

const getLatestCharacterId = (
  step: number,
  position: MessagePosition,
  messages: Message[],
) => {
  let characterId;

  for (let i = step - 1; i >= 0; i -= 1) {
    if (messages[i].messagePosition === position) {
      characterId = messages[i].characterId;
      break;
    }
  }

  return characterId;
};

const messagesAtStep = (messages: Message[], step: number) => {
  const message = messages[step];

  message.body = message.body
    .replace('$firstName', 'João')
    .replace('$lastName', 'Franco');

  let vendor: VendorMessageDialog | null = null;
  let upper: CharacterMessageDialog | null = null;
  let lower: CharacterMessageDialog | null = null;

  /*
    Although destructuring and using a loop would result in less code,
    TypeScript will be unable to discriminate between vendor and character.
   */
  if (message.messagePosition === 0) {
    vendor = { body: message.body };
  } else {
    const latestCharacterId = getLatestCharacterId(step, 0, messages);

    if (latestCharacterId === null) {
      vendor = { body: '' };
    }
  }

  if (message.messagePosition === 1) {
    upper = { body: message.body, characterId: message.characterId };
  } else {
    const latestCharacterId = getLatestCharacterId(step, 1, messages);

    if (latestCharacterId) {
      upper = { body: '', characterId: latestCharacterId };
    }
  }

  if (message.messagePosition === 2) {
    lower = { body: message.body, characterId: message.characterId };
  } else {
    const latestCharacterId = getLatestCharacterId(step, 2, messages);

    if (latestCharacterId) {
      lower = { body: '', characterId: latestCharacterId };
    }
  }

  const { sideEffects } = message;

  if (sideEffects) {
    return {
      vendor,
      upper,
      lower,
      sideEffects,
    };
  }

  return {
    vendor,
    upper,
    lower,
  };
};

export default messagesAtStep;
