import React, { ReactNode } from 'react';
import useBuilding from './hooks/useBuilding';
import {
  CharacterMessageBoxType,
  VendorMessageBoxType,
} from '../quest/getMessageBoxes';
import BuildingMenu from '../common/BuildingMenu';
import BuildingWrapper from './BuildingWrapper';
import { getFirstMateId, getGold, isLisbon } from '../../state/selectors';
import { getCrewNeeded, getPlayerFleet } from '../../state/selectorsFleet';
import { CREW_COST, recruitCrew } from '../../state/actionsPort';

const pubOptions = [
  'Recruit Crew',
  'Dismiss Crew',
  'Treat',
  'Meet',
  'Waitress',
  'Gamble',
] as const;
type PubOptions = typeof pubOptions[number];

export default function Pub() {
  const { selectOption, next, back, reset, state } = useBuilding<PubOptions>();

  const { option, step } = state;

  let vendorMessage: VendorMessageBoxType = {
    body: 'Hey sailor, you’ll like our wine!',
  };

  // Carlotta greets instead of the regular vendor
  if (isLisbon()) {
    vendorMessage = null;
  }

  let characterMessage: CharacterMessageBoxType = null;

  const menu: ReactNode = (
    <BuildingMenu
      options={pubOptions.map((s) => ({
        label: s,
        value: s,
        disabled: s !== 'Recruit Crew' || !getPlayerFleet().length,
      }))}
      onSelect={(s) => selectOption(s)}
      onCancel={back}
      hidden={option !== null || step === -1}
    />
  );

  const children: ReactNode = null;

  if (option === 'Recruit Crew') {
    vendorMessage = null;

    const gold = getGold();
    const crewNeeded = getCrewNeeded();

    if (step === 0) {
      if (!crewNeeded) {
        characterMessage = {
          body: 'We have enough men in our crew.',
          characterId: getFirstMateId(),
          acknowledge: back,
        };
      } else if (gold < CREW_COST) {
        characterMessage = {
          body: 'We don’t have enough gold.',
          characterId: getFirstMateId(),
          acknowledge: back,
        };
      } else {
        characterMessage = {
          body: 'Shall we recruit some men for our crew?',
          characterId: getFirstMateId(),
          confirm: {
            yes: next,
            no: back,
          },
        };
      }
    }

    if (step === 1) {
      characterMessage = {
        body: 'Hey! Do any of you tough sailors want to join our crew?',
        characterId: '1',
        acknowledge: next,
      };
    }

    if (step === 2) {
      let count = 0;

      if (crewNeeded * CREW_COST > gold) {
        count = Math.floor(gold / CREW_COST);
      } else {
        count = crewNeeded;
      }

      characterMessage = {
        body: `We rounded up ${count} men, at the cost of ${
          count * CREW_COST
        } gold pieces.`,
        characterId: getFirstMateId(),
        acknowledge: () => {
          recruitCrew(count);
          reset();
        },
      };
    }
  }

  return (
    <BuildingWrapper
      buildingId="2"
      vendorMessageBox={vendorMessage}
      characterMessageBox={characterMessage}
      menu={menu}
    >
      {children}
    </BuildingWrapper>
  );
}
