import React, { useState } from 'react';

import { getPlayerItems } from '../state/selectors';
import { itemData } from '../data/itemData';
import MessageBox from './common/MessageBox';
import ItemInfo from './common/ItemInfo';
import Menu from './common/Menu';

export default function Items() {
  const items = getPlayerItems();

  const [selectedItemI, setSelectedItemI] = useState(0);

  if (!items.length) {
    return (
      <MessageBox>
        <div className="text-2xl px-4 py-2 text-black w-64">
          You have no items.
        </div>
      </MessageBox>
    );
  }

  const { id } = items[selectedItemI] || {};

  return (
    <MessageBox>
      <div className="flex">
        <div className="w-[280px]">
          <Menu
            options={items.map(({ name }, i) => ({
              label: name,
              value: i,
            }))}
            onSelect={() => {}}
            onActiveIndex={setSelectedItemI}
          />
        </div>
        <div className="relative w-[736px] h-[304px]">
          <ItemInfo item={itemData[id]} />
        </div>
      </div>
    </MessageBox>
  );
}
