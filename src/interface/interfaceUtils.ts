export const classNames = (...classes: string[]): string =>
  classes.filter(Boolean).join(' ');

export const hudClass =
  'absolute bg-[#070707] p-5 text-[#aaaaaa] text-lg h-full';
