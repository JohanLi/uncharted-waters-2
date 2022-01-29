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

const messagesAtStep = (messages: Message[], step: number) => {
  const { messagePosition, ...message } = messages[step];

  message.body = message.body
    .replace('$firstName', 'João')
    .replace('$lastName', 'Franco');

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
};

export default messagesAtStep;
