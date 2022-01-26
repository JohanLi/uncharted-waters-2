import React, { useEffect, useState } from 'react';

import Assets from '../../assets';
import DialogBox from '../common/DialogBox';
import Menu from '../common/Menu';
import { exitBuilding } from '../../state/actionsPort';
import { setSail } from '../../state/actionsWorld';
import { provisions } from '../../world/fleets';
import ProgressBar from '../common/ProgressBar';
import HarborSupply, { SupplyProvision } from './HarborSupply';
import { getLoadPercent, getPlayerFleet } from '../../state/selectorsFleet';

const harborOptions = ['Sail', 'Supply', 'Moor'] as const;
export type HarborOptions = typeof harborOptions[number];

const harborDisabledOptions: HarborOptions[] = ['Moor'];

type State = { option: HarborOptions | undefined; step: number };

const initialState = { option: undefined, step: 0 };

export default function Harbor() {
  const [state, setState] = useState<State>(initialState);
  const [supplyProvision, setSupplyProvision] = useState<
    SupplyProvision | undefined
  >();

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

    if (option === 'Sail' && step === 0) {
      setSail();
    }

    if (option === 'Supply' && step === 2) {
      setSupplyProvision(undefined);
    }

    if (option === 'Supply' && step >= 2) {
      setState(initialState);
    }
  }, [state]);

  const { option, step } = state;

  let vendorMessage = 'Ahoy there, matey, will ye be shoving off?';
  let showCaretDown = false;

  if (option === 'Supply') {
    vendorMessage = '';
    showCaretDown = false;
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
        <img src={Assets.buildings(4)} alt="" className="w-[272px]" />
      </div>
      {Boolean(vendorMessage) && (
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
      )}
      <Menu
        options={harborOptions.map((s) => ({
          label: s,
          value: s,
          disabled: harborDisabledOptions.includes(s),
        }))}
        setSelected={(s) => {
          setState({
            option: s,
            step: 0,
          });
        }}
        hidden={option !== undefined}
      />
      {option === 'Supply' && step >= 0 && (
        <DialogBox className="top-[256px] left-[16px] px-8 py-6">
          <div className="flex items-center">
            <div className="w-64 text-green-600">Ship</div>
            <div className="w-24 text-[#d34100]">Load</div>
            <div className="w-24 text-blue-600 text-right">Water</div>
            <div className="w-24 text-blue-600 text-right">Food</div>
            <div className="w-24 text-blue-600 text-right">Lumber</div>
            <div className="w-24 text-blue-600 text-right">Shot</div>
          </div>
          {getPlayerFleet().map((ship, i) => (
            // TODO give ships an ID; current key isn’t fool-proof
            <div
              className="flex items-center mt-2"
              key={`${ship.id}-${ship.name}`}
            >
              <div className="w-64 text-2xl">{ship.name}</div>
              <div className="w-24">
                <ProgressBar percent={getLoadPercent(i)} />
              </div>
              {provisions.map((provision) => {
                const { quantity = 0 } =
                  ship.cargo.find((items) => items.type === provision) || {};

                return (
                  <div
                    className="w-24 text-2xl text-right cursor-pointer"
                    onClick={() => {
                      setSupplyProvision({ shipNumber: i, provision });
                      next();
                    }}
                    key={provision}
                  >
                    {quantity}
                  </div>
                );
              })}
            </div>
          ))}
        </DialogBox>
      )}
      {option === 'Supply' && step === 1 && supplyProvision !== undefined && (
        <HarborSupply supplyProvision={supplyProvision} selected={back} />
      )}
    </div>
  );
}
