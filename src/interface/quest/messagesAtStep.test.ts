import messagesAtStep from './messagesAtStep';
import { CharacterMessage, VendorMessage } from './questData';

const vendorMessage: VendorMessage = {
  body: 'Hello, World!',
  characterId: null,
  messagePosition: 0,
};

const characterMessage1: CharacterMessage = {
  body: 'Hello, World!1',
  characterId: '1',
  messagePosition: 1,
};

const characterMessage2: CharacterMessage = {
  body: 'Hello, World!2',
  characterId: '2',
  messagePosition: 2,
};

describe('When no one has spoken yet', () => {
  test('If vendor message is active, the others should be hidden', () => {
    expect(messagesAtStep([vendorMessage], 0)).toEqual({
      vendor: {
        body: vendorMessage.body,
      },
      upper: null,
      lower: null,
    });
  });

  test('If upper message is active, the others should be hidden', () => {
    expect(messagesAtStep([characterMessage1], 0)).toEqual({
      vendor: null,
      upper: {
        body: characterMessage1.body,
        characterId: characterMessage1.characterId,
      },
      lower: null,
    });
  });

  test('If lower message is active, the others should be hidden', () => {
    expect(messagesAtStep([characterMessage2], 0)).toEqual({
      vendor: null,
      upper: null,
      lower: {
        body: characterMessage2.body,
        characterId: characterMessage2.characterId,
      },
    });
  });
});

describe('Vendor message if not active', () => {
  test('Should still have an empty body if vendor has spoken prior', () => {
    expect(messagesAtStep([vendorMessage, characterMessage1], 1)).toEqual({
      vendor: { body: '' },
      upper: {
        body: characterMessage1.body,
        characterId: characterMessage1.characterId,
      },
      lower: null,
    });

    expect(
      messagesAtStep([vendorMessage, characterMessage2, characterMessage2], 2),
    ).toEqual({
      vendor: { body: '' },
      upper: null,
      lower: {
        body: characterMessage2.body,
        characterId: characterMessage2.characterId,
      },
    });
  });
});

describe('Upper message if not active', () => {
  test('Should have still have an empty body, with characterId matching the last character that used upper', () => {
    expect(messagesAtStep([characterMessage1, characterMessage2], 1)).toEqual({
      vendor: null,
      upper: {
        body: '',
        characterId: characterMessage1.characterId,
      },
      lower: {
        body: characterMessage2.body,
        characterId: characterMessage2.characterId,
      },
    });

    expect(
      messagesAtStep(
        [
          characterMessage1,
          { body: 'Hello, World!3', characterId: '3', messagePosition: 1 },
          characterMessage2,
        ],
        2,
      ),
    ).toEqual({
      vendor: null,
      upper: {
        body: '',
        characterId: '3',
      },
      lower: {
        body: characterMessage2.body,
        characterId: characterMessage2.characterId,
      },
    });
  });
});

describe('Lower message if not active', () => {
  test('Should have still have an empty body, with characterId matching the last character that used lower', () => {
    expect(messagesAtStep([characterMessage2, characterMessage1], 1)).toEqual({
      vendor: null,
      upper: {
        body: characterMessage1.body,
        characterId: characterMessage1.characterId,
      },
      lower: {
        body: '',
        characterId: characterMessage2.characterId,
      },
    });

    expect(
      messagesAtStep([characterMessage2, vendorMessage, characterMessage1], 2),
    ).toEqual({
      vendor: { body: '' },
      upper: {
        body: characterMessage1.body,
        characterId: characterMessage1.characterId,
      },
      lower: {
        body: '',
        characterId: characterMessage2.characterId,
      },
    });
  });
});

test('Returns the side effects of the current message', () => {
  expect(
    messagesAtStep(
      [{ ...characterMessage1, sideEffects: { exitBuilding: true } }],
      0,
    ).sideEffects,
  ).toEqual({ exitBuilding: true });

  expect(
    messagesAtStep(
      [
        characterMessage1,
        { ...characterMessage2, sideEffects: { completeQuest: true } },
      ],
      1,
    ).sideEffects,
  ).toEqual({ completeQuest: true });
});

test('Substitutes $firstName', () => {
  expect(
    messagesAtStep(
      [{ body: 'Hello, $firstName!', characterId: null, messagePosition: 0 }],
      0,
    ).vendor,
  ).toEqual({ body: 'Hello, João!' });
});

test('Substitutes $lastName', () => {
  expect(
    messagesAtStep(
      [{ body: 'Hello, $lastName!', characterId: null, messagePosition: 0 }],
      0,
    ).vendor,
  ).toEqual({ body: 'Hello, Franco!' });
});
