import React, { ReactNode } from 'react';
import {
  getAttackOrDefenseDisplay,
  Item,
  itemCategories,
} from '../data/itemData';
import Assets from '../assets';

interface Props {
  item?: Item;
}

export default function ItemShopItemBox({ item }: Props) {
  let inner: ReactNode;

  if (item) {
    const { name, description, imageSlice, rating, categoryId } = item;

    const attackOrDefenseDisplay = getAttackOrDefenseDisplay(
      rating,
      categoryId,
    );

    inner = (
      <>
        <div className="absolute top-0 left-0 px-16 pt-8">
          <div className="text-2xl">
            <span className="text-blue-600">{name}</span>
            <span className="text-black ml-4">
              ({itemCategories[categoryId]})
            </span>
          </div>
          {attackOrDefenseDisplay !== null && (
            <div>
              <span>{attackOrDefenseDisplay.label}</span>
              <span className="text-red-600 ml-2">
                {attackOrDefenseDisplay.letter}
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center h-full px-16">
          <img src={Assets.items(imageSlice)} className="w-24 h-24" alt="" />
          <div className="flex-1 pl-16 text-2xl -mt-2">{description}</div>
        </div>
      </>
    );
  }

  return (
    <div
      className="absolute top-[256px] w-[736px] h-[304px]"
      style={{
        background: `url('${Assets.images('dialogShip').toDataURL()}')`,
        backgroundSize: '736px 304px',
      }}
    >
      {inner}
    </div>
  );
}
