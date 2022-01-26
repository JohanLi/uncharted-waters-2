import React, { ReactNode } from 'react';

import Assets from '../../assets';
import { classNames } from '../interfaceUtils';

const cornerClasses = [
  'top-0 left-0',
  'top-0 right-0 rotate-90',
  'bottom-0 right-0 rotate-180',
  'bottom-0 left-0 rotate-[270deg]',
];

interface Props {
  className: string;
  children: ReactNode;
}

export default function DialogBox({ className, children }: Props) {
  return (
    <div
      className={classNames('absolute p-4 bg-[#f3e3d3]', className)}
      style={{
        boxShadow: `
          inset 0 0 0 2px #000,
          inset 0 0 0 4px #d34100,
          inset 0 0 0 6px #f3a261,
          inset 0 0 0 8px #d34100,
          inset 0 0 0 10px #d34100,
          inset 0 0 0 12px #00a261,
          inset 0 0 0 14px #d34100,
          inset 0 0 0 16px #f3e3d3
        `,
      }}
    >
      {cornerClasses.map((cornerClass) => (
        <img
          className={classNames('w-4 h-4 absolute bg-no-repeat', cornerClass)}
          src={Assets.images.dialogCorner.toDataURL()}
          alt=""
          key={cornerClass}
        />
      ))}
      {children}
    </div>
  );
}
