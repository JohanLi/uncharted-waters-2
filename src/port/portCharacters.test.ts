import { getStartFrame } from './portCharacters';

test('getStartFrameByCharacterId', () => {
  expect(getStartFrame(1)).toEqual(0);
  expect(getStartFrame(4)).toEqual(24);
  expect(getStartFrame(5)).toEqual(26);
  expect(getStartFrame(7)).toEqual(30);
});
