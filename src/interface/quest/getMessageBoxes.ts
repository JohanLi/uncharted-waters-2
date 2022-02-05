import {
  CharacterMessage,
  messagePositions,
  Message,
  VendorMessage,
} from './questData';

export type VendorMessageBoxType =
  | (Pick<VendorMessage, 'body'> & MessageBoxCommonType)
  | null;

export type CharacterMessageBoxType =
  | (Pick<CharacterMessage, 'body' | 'characterId'> & MessageBoxCommonType)
  | null;

type MessageBoxCommonType = {
  acknowledge?: () => void;
  confirm?: {
    yes: () => void;
    no: () => void;
  };
};

export type MessageBoxes = [
  VendorMessageBoxType,
  CharacterMessageBoxType,
  CharacterMessageBoxType,
];

const getMessageBoxes = (messages: Message[], step: number) => {
  const message = messages[step];
  message.body = message.body
    .replace('$firstName', 'João')
    .replace('$lastName', 'Franco');

  return messagePositions.map((position) => {
    if (position === 0) {
      if (message.position === position) {
        return { body: message.body };
      }

      let vendorSpoken = false;

      for (let i = step - 1; i >= 0; i -= 1) {
        if (messages[i].position === position) {
          vendorSpoken = true;
          break;
        }
      }

      if (vendorSpoken) {
        return { body: '' };
      }

      return null;
    }

    if (message.position === position) {
      return { body: message.body, characterId: message.characterId };
    }

    let latestCharacterId;

    for (let i = step - 1; i >= 0; i -= 1) {
      const earlierMessage = messages[i];

      if (earlierMessage.position === position) {
        latestCharacterId = earlierMessage.characterId;
        break;
      }
    }

    if (latestCharacterId) {
      return {
        body: '',
        characterId: latestCharacterId,
      };
    }

    return null;
  }) as MessageBoxes;
};

export default getMessageBoxes;
