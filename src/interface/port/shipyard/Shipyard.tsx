import React, { ReactNode, useState } from 'react';

import Menu from '../../common/Menu';
import {
  purchaseUsedShip,
  SELL_SHIP_MODIFIER,
  sellShipNumber,
} from '../../../state/actionsPort';
import ShipyardShipBox from './ShipyardShipBox';
import { shipData } from '../../../data/shipData';
import {
  getPlayerFleet,
  getPlayerFleetShip,
} from '../../../state/selectorsFleet';
import BuildingWrapper from '../BuildingWrapper';
import useBuilding from '../hooks/useBuilding';
import { VendorMessageBoxType } from '../../quest/getMessageBoxes';
import ShipyardShipNameInput from './ShipyardShipNameInput';

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

const usedShips = [
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
];

export default function Shipyard() {
  const { selectOption, back, next, reset, state } =
    useBuilding<ShipyardOptions>();

  const [usedShipId, setUsedShipId] = useState<string>();

  const [selectedShipNumberToSell, setSelectedShipNumberToSell] =
    useState<number>();

  const { option, step } = state;

  let vendorMessage: VendorMessageBoxType = {
    body: 'What brings you to this shipyard?',
  };

  const menu = (
    <Menu
      options={shipyardOptions.map((s) => ({
        label: s,
        value: s,
        disabled: shipyardDisabledOptions.includes(s),
      }))}
      onSelect={(s) => selectOption(s)}
      onCancel={back}
      hidden={option !== null}
    />
  );

  let menu2: ReactNode;

  let children: ReactNode;

  if (option === 'Used Ship') {
    menu2 = (
      <Menu
        title="Ship Model"
        options={usedShips}
        onSelect={(shipId) => {
          setUsedShipId(shipId);
          next();
        }}
        onCancel={back}
        wide
        hidden={step !== 0}
      />
    );

    if (usedShipId) {
      children = <ShipyardShipBox shipId={usedShipId} />;

      if (step === 1) {
        vendorMessage = {
          body: shipData[usedShipId].description,
          acknowledge: next,
        };
      }

      if (step === 2) {
        vendorMessage = {
          body: 'Will ye buy this one?',
          confirm: {
            yes: next,
            no: () => {
              setUsedShipId(undefined);
              back(2);
            },
          },
        };
      }

      if (step === 3) {
        vendorMessage = {
          body: `I’d sell this ship for ${shipData[usedShipId].basePrice} gold pieces. What do ye say?`,
          confirm: {
            yes: next,
            no: () => {
              setUsedShipId(undefined);
              back(3);
            },
          },
        };
      }

      if (step === 4) {
        vendorMessage = {
          body: `All right, it’s yers. Time to name yer ship.`,
        };

        children = (
          <ShipyardShipNameInput
            onSubmit={(usedShipName) => {
              purchaseUsedShip(usedShipId, usedShipName);
              setUsedShipId(undefined);
              reset();
            }}
            onCancel={() => {
              setUsedShipId(undefined);
              back(4);
            }}
          />
        );
      }
    }
  }

  if (option === 'Repair') {
    vendorMessage = {
      body: 'Your fleet’s already in tiptop shape, matey!',
      acknowledge: back,
    };
  }

  if (option === 'Sell') {
    if (getPlayerFleet().length === 1) {
      if (step === 0) {
        vendorMessage = {
          body: 'We only have the flag ship.',
          acknowledge: back,
        };
      }
    } else {
      menu2 = (
        <Menu
          title="Your Ships"
          options={getPlayerFleet().map((ship, i) => ({
            label: ship.name,
            value: i,
          }))}
          onSelect={(value) => {
            setSelectedShipNumberToSell(value);
            next();
          }}
          onCancel={back}
          wide
          hidden={step !== 0}
        />
      );

      if (step === 0) {
        vendorMessage = {
          body: 'Which one is for sale?',
        };
      }

      if (step === 1 && selectedShipNumberToSell !== undefined) {
        /*
          TODO
            As you currently cannot modify ships and there are no hull types,
            we can just use the defaults for the ship model in question.
         */
        const ship = getPlayerFleetShip(selectedShipNumberToSell);

        vendorMessage = {
          body: `For this ship, I’ll give you ${
            shipData[ship.id].basePrice * SELL_SHIP_MODIFIER
          } gold pieces. OK?`,
          confirm: {
            yes: () => {
              sellShipNumber(selectedShipNumberToSell);
              setSelectedShipNumberToSell(undefined);
              reset();
            },
            no: () => {
              setSelectedShipNumberToSell(undefined);
              back();
            },
          },
        };

        children = (
          <ShipyardShipBox shipId={ship.id} customShipName={ship.name} />
        );
      }
    }
  }

  return (
    <BuildingWrapper
      buildingId="3"
      vendorMessageBox={vendorMessage}
      menu={menu}
      menu2={menu2}
    >
      {children}
    </BuildingWrapper>
  );
}
