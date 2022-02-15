import { START_DATE } from '../constants';

export const classNames = (...classes: string[]): string =>
  classes.filter(Boolean).join(' ');

export const hudClass = 'w-[180px] text-[#aaaaaa] text-lg';

export const getDate = (timePassed: number) => {
  const date = new Date(START_DATE);
  date.setMinutes(date.getMinutes() + timePassed);

  return `${date.toLocaleString('en-us', {
    month: 'short',
  })} ${date.getDate()} ${date.getFullYear()}`;
};

export const getHoursMinutes = (timePassed: number) => {
  let hours = Math.floor((timePassed % 1440) / 60);
  let period = 'AM';

  if (hours >= 12) {
    period = 'PM';
  }

  hours %= 12;

  if (hours === 0) {
    hours = 12;
  }

  const minutes = timePassed % 60;

  if (minutes < 10) {
    return `${hours}:0${minutes} ${period}`;
  }

  return `${hours}:${minutes} ${period}`;
};

export const getIngots = (gold: number) => Math.floor(gold / 10000);

export const getCoins = (gold: number) => gold % 10000;

export const minutesUntilNextMorning = (timePassed: number) => {
  const nextMorning = Math.floor(timePassed / 1440) * 1440 + 1440 + 480;

  return nextMorning - timePassed;
};
