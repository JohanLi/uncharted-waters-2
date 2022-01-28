import React, { ChangeEvent, useEffect, useState } from 'react';

import DialogBox from '../common/DialogBox';
import Menu from '../common/Menu';
import {
  purchaseUsedShip,
  SELL_SHIP_MODIFIER,
  sellShipNumber,
} from '../../state/actionsPort';
import DialogShipInfo from './DialogShipInfo';
import { shipData } from '../../data/shipData';
import DialogYesNo from '../common/DialogYesNo';
import { getPlayerFleet, getPlayerFleetShip } from '../../state/selectorsFleet';
import BuildingWrapper, { VendorMessage } from './BuildingWrapper';
import useBuildingState from './hooks/useBuildingState';

const shipyardOptions = [
  'New Ship',
  'Used Ship',
  'Repair',
  'Sell',
  'Remodel',
  'Invest',
] as const;
type ShipyardOptions = typeof shipyardOptions[number];

const shipyardDisabledOptions: ShipyardOptions[] = [
  'New Ship',
  'Remodel',
  'Invest',
];

export default function Shipyard() {
  const { selectOption, back, next, reset, state } =
    useBuildingState<ShipyardOptions>();

  const [selectedShipId, setSelectedShipId] = useState<string>();
  const [purchasedShipName, setPurchasedShipName] = useState('');

  const [selectedShipNumberToSell, setSelectedShipNumberToSell] =
    useState<number>();

  useEffect(() => {
    const { option, step } = state;

    if (option === 'Repair' && step >= 1) {
      reset();
    }

    if (option === 'Used Ship' && step >= 5 && selectedShipId) {
      purchaseUsedShip(selectedShipId, purchasedShipName);
      reset();
    }

    if (option === 'Sell' && step === 1 && getPlayerFleet().length === 1) {
      reset();
    }

    if (
      option === 'Sell' &&
      step === 2 &&
      selectedShipNumberToSell !== undefined
    ) {
      sellShipNumber(selectedShipNumberToSell);
      reset();
    }
  }, [state]);

  const { option, step } = state;

  const vendorMessage: VendorMessage = {
    body: 'What brings you to this shipyard?',
    showCaretDown: false,
  };

  if (option === 'Repair') {
    vendorMessage.body = 'Your fleet’s already in tiptop shape, matey!';
    vendorMessage.showCaretDown = true;
  }

  if (option === 'Used Ship') {
    if (step === 1 && selectedShipId) {
      vendorMessage.body = shipData[selectedShipId].description;
      vendorMessage.showCaretDown = true;
    }

    if (step === 2) {
      vendorMessage.body = 'Will ye buy this one?';
    }

    if (step === 3 && selectedShipId) {
      vendorMessage.body = `I’d sell this ship for ${shipData[selectedShipId].basePrice} gold pieces. What do ye say?`;
    }

    if (step === 4) {
      vendorMessage.body = `All right, it’s yers. Time to name yer ship.`;
    }
  }

  if (option === 'Sell') {
    if (step === 0) {
      if (getPlayerFleet().length === 1) {
        vendorMessage.body = 'We only have the flag ship.';
        vendorMessage.showCaretDown = true;
      } else {
        vendorMessage.body = 'Which one is for sale?';
      }
    }

    if (step === 1 && selectedShipNumberToSell !== undefined) {
      const shipId = getPlayerFleetShip(selectedShipNumberToSell).id;
      vendorMessage.body = `For this ship, I’ll give you ${
        shipData[shipId].basePrice * SELL_SHIP_MODIFIER
      } gold pieces. OK?`;
    }
  }

  const menu = (
    <Menu
      options={shipyardOptions.map((s) => ({
        label: s,
        value: s,
        disabled: shipyardDisabledOptions.includes(s),
      }))}
      setSelected={(s) => {
        selectOption(s);
      }}
      hidden={option !== null}
    />
  );

  return (
    <BuildingWrapper buildingId="3" vendorMessage={vendorMessage} menu={menu}>
      {option === 'Used Ship' && (
        <div className="absolute top-[190px] left-[696px]">
          <Menu
            title="Ship Model"
            options={[
              {
                label: 'Light Galley',
                value: '19',
              },
              {
                label: 'Brigantine',
                value: '8',
              },
              {
                label: 'Flemish Galleon',
                value: '20',
              },
              {
                label: 'Galleon',
                value: '11',
              },
            ]}
            setSelected={(shipId) => {
              setSelectedShipId(shipId);
              next();
            }}
            wide
            hidden={step !== 0}
          />
        </div>
      )}
      {option === 'Used Ship' && step > 0 && selectedShipId && (
        <DialogShipInfo shipId={selectedShipId} />
      )}
      {option === 'Used Ship' && step === 2 && (
        <DialogYesNo
          onSelected={(selected) => {
            if (selected) {
              next();
            } else {
              back(2);
            }
          }}
          initialPosition={{ x: 696, y: 190 }}
        />
      )}
      {option === 'Used Ship' && step === 3 && (
        <DialogYesNo
          onSelected={(selected) => {
            if (selected) {
              next();
            } else {
              back(3);
            }
          }}
          initialPosition={{ x: 696, y: 190 }}
        />
      )}
      {option === 'Used Ship' && step === 4 && (
        <div className="absolute top-[500px] left-[96px]">
          <DialogBox className="">
            <div className="w-[272px] text-2xl p-4">
              <div className="mb-4">Ship name?</div>
              <div>
                <input
                  type="text"
                  className="outline-none shadow-none border-b-2 border-black -mb-2 bg-transparent w-full"
                  value={purchasedShipName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPurchasedShipName(e.target.value)
                  }
                />
              </div>
            </div>
          </DialogBox>
        </div>
      )}
      {option === 'Sell' && getPlayerFleet().length > 1 && (
        <div className="absolute top-[190px] left-[696px]">
          <Menu
            title="Your Ships"
            options={getPlayerFleet().map((ship, i) => ({
              label: ship.name,
              value: i,
            }))}
            setSelected={(value) => {
              setSelectedShipNumberToSell(value);
              next();
            }}
            wide
            hidden={step !== 0}
          />
        </div>
      )}
      {option === 'Sell' && step === 1 && (
        <DialogYesNo
          onSelected={(selected) => {
            if (selected) {
              next();
            } else {
              back(1);
            }
          }}
          initialPosition={{ x: 696, y: 190 }}
        />
      )}
    </BuildingWrapper>
  );
}
