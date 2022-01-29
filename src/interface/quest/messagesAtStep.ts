import {
  CharacterMessage,
  Message,
  MessagePosition,
  VendorMessage,
} from './questData';

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

type VendorMessageDialog = Pick<VendorMessage, 'body' | 'characterId'> | null;
export type CharacterMessageDialog = Pick<
  CharacterMessage,
  'body' | 'characterId'
> | null;

const messagesAtStep = (messages: Message[], step: number) => {
  const message = messages[step];

  message.body = message.body
    .replace('$firstName', 'João')
    .replace('$lastName', 'Franco');

  let vendor: VendorMessageDialog = null;
  let upper: CharacterMessageDialog = null;
  let lower: CharacterMessageDialog = null;

  if (message.messagePosition === 0) {
    vendor = { body: message.body, characterId: message.characterId };
  } else {
    const latestCharacterId = getLatestCharacterId(step, 0, messages);

    if (latestCharacterId === null) {
      vendor = {
        body: '',
        characterId: null,
      };
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

  return {
    vendor,
    upper,
    lower,
  };
};

export default messagesAtStep;
