import React, { ReactNode, useRef } from 'react';
import useBuilding from './hooks/useBuilding';
import { VendorMessageBoxType } from '../quest/getMessageBoxes';
import Menu from '../common/Menu';
import BuildingWrapper from './BuildingWrapper';
import { donate, pray } from '../../state/actionsPort';
import { getAtMosque, getGold } from '../../state/selectors';
import InputNumeric from '../common/InputNumeric';

const churchOptions = ['Pray', 'Donate'] as const;
type ChurchOptions = typeof churchOptions[number];

export default function Church() {
  const { selectOption, next, back, reset, state } =
    useBuilding<ChurchOptions>(true);

  const wasLargeDonation = useRef(false);

  const atMosque = getAtMosque();

  const { option, step } = state;

  let vendorMessage: VendorMessageBoxType = {
    body: 'Welcome to our church.',
  };

  let menu: ReactNode = (
    <Menu
      options={churchOptions.map((s) => ({
        label: s,
        value: s,
      }))}
      onSelect={(s) => selectOption(s)}
      onCancel={back}
      hidden={option !== null || step === -1}
    />
  );

  let children: ReactNode;

  if (option === 'Pray') {
    vendorMessage = {
      body: 'Let’s pray that God will protect you.',
      acknowledge: () => {
        pray();
        reset();
      },
    };
  }

  if (option === 'Donate') {
    const gold = getGold();

    if (step === 0) {
      if (!gold) {
        // TODO this should be a characterMessage
        vendorMessage = {
          body: `You have no gold.`,
          acknowledge: reset,
        };
      } else {
        vendorMessage = {
          body: `Your money will be used to feed the poor. How much can you give?`,
        };

        children = (
          <InputNumeric
            limit={gold}
            onComplete={(amount) => {
              if (donate(amount) >= 10) {
                wasLargeDonation.current = true;
              }

              next();
            }}
            onCancel={reset}
          />
        );
      }
    }

    if (step === 1) {
      vendorMessage = {
        body: wasLargeDonation.current
          ? 'Thank you for your generous donation. Our heavenly father will surely watch over you.'
          : 'Come visit us again.',
        acknowledge: reset,
      };
    }
  }

  if (step === -1) {
    vendorMessage = {
      body: 'May God bless you in your travels!',
      acknowledge: back,
    };
  }

  if (atMosque) {
    vendorMessage = {
      body: 'I respect your interest, but Christians are not allowed in the house of Allah.',
      acknowledge: () => back(2),
    };

    menu = null;
  }

  return (
    <BuildingWrapper
      buildingId={!atMosque ? '11' : '13'}
      vendorMessageBox={vendorMessage}
      menu={menu}
    >
      {children}
    </BuildingWrapper>
  );
}
