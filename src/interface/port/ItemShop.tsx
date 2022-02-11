import React, { ReactNode, useRef, useState } from 'react';
import useBuilding from './hooks/useBuilding';
import { VendorMessageBoxType } from '../quest/getMessageBoxes';
import Menu from '../common/Menu';
import BuildingWrapper from './BuildingWrapper';
import {
  getPlayerItems,
  getItemShopStock,
  getPlayerItem,
  getGold,
} from '../../state/selectors';
import { itemData, ItemId } from '../../data/itemData';
import ItemShopItemBox from '../ItemShopItemBox';
import {
  buyItem,
  ITEM_SHOP_SELL_MULTIPLIER,
  sellItem,
} from '../../state/actionsPort';

const itemShopOptions = ['Buy', 'Sell'] as const;
type ItemShopOptions = typeof itemShopOptions[number];

// TODO haggling, items that cannot be sold, equipment limit
export default function ItemShop() {
  const { selectOption, next, back, state } = useBuilding<ItemShopOptions>();

  const hasBought = useRef(false);
  const [selectedItemId, setSelectedItemId] = useState<ItemId>();

  const hasSold = useRef(false);
  const [selectedItemI, setSelectedItemI] = useState<number>();

  const { option, step } = state;

  let vendorMessage: VendorMessageBoxType = {
    body: 'May I help you?',
  };

  const menu: ReactNode = (
    <Menu
      options={itemShopOptions.map((s) => ({
        label: s,
        value: s,
      }))}
      onSelect={(s) => selectOption(s)}
      onCancel={back}
      hidden={option !== null || step === -1}
    />
  );

  let menu2: ReactNode;

  let children: ReactNode;

  if (option === 'Buy') {
    if (getGold()) {
      vendorMessage = {
        body: !hasBought.current
          ? 'I’m sure you’ll find something you like.'
          : 'Are you interested in anything else?',
      };

      menu2 = (
        <Menu
          title="Item"
          options={getItemShopStock().map((item) => ({
            label: item.name,
            value: item.id,
          }))}
          onSelect={(itemId) => {
            setSelectedItemId(itemId);
            next();
          }}
          onCancel={back}
          wide
          hidden={step !== 0}
        />
      );
    } else {
      vendorMessage = {
        body: 'It seems you have no gold.',
        acknowledge: back,
      };
    }

    children = <ItemShopItemBox />;

    if (selectedItemId) {
      if (step === 1) {
        const item = itemData[selectedItemId];

        vendorMessage = {
          body: `The ${item.name} will cost you ${item.price} gold pieces.`,
          confirm: {
            yes: () => {
              if (buyItem(selectedItemId)) {
                hasBought.current = true;
                back();
              } else {
                next();
              }
            },
            no: () => {
              setSelectedItemId(undefined);
              back();
            },
          },
        };

        children = <ItemShopItemBox item={item} />;
      }

      if (step === 2) {
        vendorMessage = {
          body: `I’m afraid you don’t have enough gold.`,
          acknowledge: () => back(2),
        };
      }
    }
  }

  if (option === 'Sell') {
    const items = getPlayerItems();

    if (!items.length) {
      vendorMessage = {
        body: 'You don’t have any items.',
        acknowledge: back,
      };
    } else {
      vendorMessage = {
        body: !hasSold.current
          ? 'What would you like to sell?'
          : 'What else can you sell me?',
      };

      menu2 = (
        <Menu
          title="Item"
          options={items.map((item, i) => ({
            label: item.name,
            value: i,
          }))}
          onSelect={(i) => {
            setSelectedItemI(i);
            next();
          }}
          onCancel={back}
          wide
          hidden={step !== 0}
        />
      );

      children = <ItemShopItemBox />;
    }

    if (selectedItemI !== undefined) {
      if (step === 1) {
        const item = getPlayerItem(selectedItemI);

        vendorMessage = {
          body: `I’d like to take that ${
            item.name
          } off your hands. I’ll take it for ${
            item.price * ITEM_SHOP_SELL_MULTIPLIER
          } gold pieces.`,
          confirm: {
            yes: () => {
              sellItem(selectedItemI);
              hasSold.current = true;
              back();
            },
            no: () => {
              setSelectedItemI(undefined);
              back();
            },
          },
        };

        children = <ItemShopItemBox item={item} />;
      }
    }
  }

  return (
    <BuildingWrapper
      buildingId="10"
      vendorMessageBox={vendorMessage}
      menu={menu}
      menu2={menu2}
    >
      {children}
    </BuildingWrapper>
  );
}
