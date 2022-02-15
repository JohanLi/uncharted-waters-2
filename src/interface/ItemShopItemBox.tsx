import React from 'react';
import { Item } from '../data/itemData';
import Assets from '../assets';
import ItemInfo from './common/ItemInfo';

interface Props {
  item: Item;
}

export default function ItemShopItemBox({ item }: Props) {
  return (
    <div
      className="absolute top-[256px] w-[736px] h-[304px]"
      style={{
        background: `url('${Assets.images('dialogShip').toDataURL()}')`,
        backgroundSize: '736px 304px',
      }}
      data-test="itemShopItemBox"
    >
      <ItemInfo item={item} />
    </div>
  );
}
