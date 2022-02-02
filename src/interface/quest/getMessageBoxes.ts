import {
  CharacterMessage,
  messagePositions,
  Message,
  VendorMessage,
} from './questData';

export type VendorMessageBoxType =
  | (Pick<VendorMessage, 'body'> & {
      showCaretDown?: true;
    })
  | null;

export type CharacterMessageBoxType =
  | (Pick<CharacterMessage, 'body' | 'characterId'> & {
      showCaretDown?: true;
    })
  | null;

export const showCaretDown = (message: Pick<Message, 'confirm'> | null) =>
  Boolean(message && message.confirm === undefined);

const getMessageBoxes = (messages: Message[], step: number) => {
  const message = messages[step];
  message.body = message.body
    .replace('$firstName', 'João')
    .replace('$lastName', 'Franco');

  return messagePositions.map((position) => {
    if (position === 0) {
      if (message.position === position) {
        if (showCaretDown(message)) {
          return { body: message.body, showCaretDown: true };
        }

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
      if (showCaretDown(message)) {
        return {
          body: message.body,
          characterId: message.characterId,
          showCaretDown: true,
        };
      }

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
  }) as [
    VendorMessageBoxType,
    CharacterMessageBoxType,
    CharacterMessageBoxType,
  ];
};

export default getMessageBoxes;
