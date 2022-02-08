import { getStartFrame } from './portCharactersData';

test('Characters up to and including MAN have 8 frames each', () => {
  expect(getStartFrame('PLAYER')).toEqual(0);
  expect(getStartFrame('MAN')).toEqual(16);
  expect(getStartFrame('MERCHANT')).toEqual(24);
});

test('Characters from MERCHANT and up have 2 frames each', () => {
  expect(getStartFrame('DOG')).toEqual(26);
  expect(getStartFrame('GUARD')).toEqual(28);
  expect(getStartFrame('BEGGAR')).toEqual(30);
});
