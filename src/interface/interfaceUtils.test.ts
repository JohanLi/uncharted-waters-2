import { minutesUntilNextMorning } from './interfaceUtils';

test('minutesUntilNextMorning', () => {
  expect(minutesUntilNextMorning(0)).toEqual(1440 + 480);
  expect(minutesUntilNextMorning(480)).toEqual(1440);
  expect(minutesUntilNextMorning(500)).toEqual(1440 - 20);
  expect(minutesUntilNextMorning(1439)).toEqual(1 + 480);
  expect(minutesUntilNextMorning(1440)).toEqual(1440 + 480);
  expect(minutesUntilNextMorning(1640)).toEqual(1440 - 200 + 480);
  expect(minutesUntilNextMorning(2880)).toEqual(1440 + 480);
});
