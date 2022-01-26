import React, { ChangeEvent, useEffect, useState } from 'react';

import Assets from '../../assets';
import DialogBox from '../common/DialogBox';
import Menu from '../common/Menu';
import {
  exitBuilding,
  purchaseUsedShip,
  SELL_SHIP_MODIFIER,
  sellShipNumber,
} from '../../state/actionsPort';
import DialogShipInfo from './DialogShipInfo';
import { shipData } from '../../data/shipData';
import DialogYesNo from '../common/DialogYesNo';
import { getPlayerFleet, getPlayerFleetShip } from '../../state/selectorsFleet';

const shipyardOptions = [
  'New Ship',
  'Used Ship',
  'Repair',
  'Sell',
  'Remodel',
  'Invest',
] as const;
export type ShipyardOptions = typeof shipyardOptions[number];

const shipyardDisabledOptions: ShipyardOptions[] = [
  'New Ship',
  'Remodel',
  'Invest',
];

type State = { option: ShipyardOptions | undefined; step: number };

const initialState = { option: undefined, step: 0 };

export default function Shipyard() {
  const [state, setState] = useState<State>(initialState);
  const [selectedShipId, setSelectedShipId] = useState<string>();
  const [purchasedShipName, setPurchasedShipName] = useState('');

  const [selectedShipNumberToSell, setSelectedShipNumberToSell] =
    useState<number>();

  const back = (steps = 1) => {
    if (state.step > 0) {
      setState({
        ...state,
        step: state.step - steps,
      });
      return;
    }

    if (!state.option) {
      exitBuilding();
      return;
    }

    setState({
      option: undefined,
      step: 0,
    });
  };

  const next = () => {
    setState({
      ...state,
      step: state.step + 1,
    });
  };

  useEffect(() => {
    const onKeyup = (e: KeyboardEvent) => {
      const pressedKey = e.key.toLowerCase();

      if (pressedKey === 'enter') {
        if (state.option) {
          next();
        }
      }

      if (pressedKey === 'escape') {
        back();
      }
    };

    const onContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      back();
    };

    window.addEventListener('keyup', onKeyup);
    window.addEventListener('contextmenu', onContextMenu);

    return () => {
      window.removeEventListener('keyup', onKeyup);
      window.removeEventListener('contextmenu', onContextMenu);
    };
  }, [state]);

  useEffect(() => {
    const { option, step } = state;

    if (option === 'Repair' && step >= 1) {
      setState(initialState);
    }

    if (option === 'Used Ship' && step >= 5 && selectedShipId) {
      purchaseUsedShip(selectedShipId, purchasedShipName);
      setState(initialState);
    }

    if (option === 'Sell' && step === 1 && getPlayerFleet().length === 1) {
      setState(initialState);
    }

    if (
      option === 'Sell' &&
      step === 2 &&
      selectedShipNumberToSell !== undefined
    ) {
      sellShipNumber(selectedShipNumberToSell);
      setState(initialState);
    }
  }, [state]);

  const { option, step } = state;

  let vendorMessage = 'What brings you to this shipyard?';
  let showCaretDown = false;

  if (option === 'Repair') {
    vendorMessage = 'Your fleet’s already in tiptop shape, matey!';
    showCaretDown = true;
  }

  if (option === 'Used Ship') {
    if (step === 1 && selectedShipId) {
      vendorMessage = shipData[selectedShipId].description;
      showCaretDown = true;
    }

    if (step === 2) {
      vendorMessage = 'Will ye buy this one?';
    }

    if (step === 3 && selectedShipId) {
      vendorMessage = `I’d sell this ship for ${shipData[selectedShipId].basePrice} gold pieces. What do ye say?`;
    }

    if (step === 4) {
      vendorMessage = `All right, it’s yers. Time to name yer ship.`;
    }
  }

  if (option === 'Sell') {
    if (step === 0) {
      if (getPlayerFleet().length === 1) {
        vendorMessage = 'We only have the flag ship.';
        showCaretDown = true;
      } else {
        vendorMessage = 'Which one is for sale?';
      }
    }

    if (step === 1 && selectedShipNumberToSell !== undefined) {
      const shipId = getPlayerFleetShip(selectedShipNumberToSell).id;
      vendorMessage = `For this ship, I’ll give you ${
        shipData[shipId].basePrice * SELL_SHIP_MODIFIER
      } gold pieces. OK?`;
    }
  }

  return (
    <div
      className="w-full h-full"
      style={{
        background: `url('${Assets.images.buildingBackground.toDataURL()}')`,
        lineHeight: 1.5,
        backgroundSize: '256px 128px',
      }}
    >
      <div className="absolute top-4 left-4">
        <img src={Assets.buildings(3)} alt="" className="w-[272px]" />
      </div>
      <DialogBox className="w-[480px] h-[256px] top-0 left-[288px] text-2xl px-8 py-6">
        {vendorMessage}
        {showCaretDown && (
          <img
            src={Assets.images.dialogCaretDown.toDataURL()}
            alt=""
            className="w-8 h-8 animate-ping mx-auto mt-8"
          />
        )}
      </DialogBox>
      <Menu
        options={shipyardOptions.map((s) => ({
          label: s,
          value: s,
          disabled: shipyardDisabledOptions.includes(s),
        }))}
        setSelected={(s) => {
          setState({
            option: s,
            step: 0,
          });
        }}
        hidden={option !== undefined}
      />
      {option === 'Used Ship' && (
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
        <DialogBox className="w-[272px] top-[500px] left-[96px] text-2xl px-8 py-6">
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
        </DialogBox>
      )}
      {option === 'Sell' && getPlayerFleet().length > 1 && (
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
    </div>
  );
}
