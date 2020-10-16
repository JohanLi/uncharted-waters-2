declare module '*.css' {
  const classNames: {
    [className: string]: string;
  };
  export = classNames;
}

declare module '*.png';
declare module '*.bin';
