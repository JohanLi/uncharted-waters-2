import React from 'react';

import MessageBox from './MessageBox';
import Menu, { Option } from './Menu';

interface Props<T> {
  options: Option<T>[];
  onSelect: (value: T) => void;
  onCancel: () => void;
  title?: string;
  level2?: boolean;
  hidden?: boolean;
}

export default function BuildingMenu<T extends number | string>({
  options,
  onSelect,
  onCancel,
  title = '',
  hidden = false,
  level2 = false,
}: Props<T>) {
  return (
    <div
      className={hidden ? 'hidden' : ''}
      data-test={!level2 ? 'menu' : 'menu2'}
    >
      <MessageBox>
        <div className={level2 ? 'w-[280px]' : 'w-[208px]'}>
          {Boolean(title) && (
            <div className="text-center text-2xl py-2 mb-4 cursor-pointer bg-orange-200">
              {title}
            </div>
          )}
          <Menu
            options={options}
            onSelect={onSelect}
            onCancel={onCancel}
            hidden={hidden}
            center={!level2}
          />
        </div>
      </MessageBox>
    </div>
  );
}
