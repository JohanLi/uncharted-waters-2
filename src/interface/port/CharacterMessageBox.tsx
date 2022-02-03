import React from 'react';

import Assets from '../../assets';
import { classNames } from '../interfaceUtils';
import MessageBox from '../common/MessageBox';
import { CharacterMessageBoxType } from '../quest/getMessageBoxes';
import useCaretDown from './hooks/useCaretDown';

type CharacterData = {
  [key: string]: {
    name: string;
    color: string;
  };
};

const characterData: CharacterData = {
  '1': {
    name: 'João',
    color: 'text-blue-600',
  },
  '7': {
    name: 'Butler Marco',
    color: 'text-blue-900',
  },
  '19': {
    name: 'Duke Franco',
    color: 'text-red-600',
  },
  '32': {
    name: 'Old Sea Hand Rocco',
    color: 'text-amber-800',
  },
  '98': {
    name: 'Carlotta, Owner of the Pub',
    color: 'text-amber-600',
  },
  '99': {
    name: 'Lucia the Waitress',
    color: 'text-yellow-600',
  },
};

type Position = 1 | 2;

interface Props {
  messageBox: CharacterMessageBoxType;
  position: Position;
}

const positionClassMap: { [key in Position]: string } = {
  1: 'absolute top-4 left-[304px]',
  2: 'absolute top-[320px] ml-[416px]',
};

export default function CharacterMessageBox({ messageBox, position }: Props) {
  useCaretDown(messageBox?.showCaretDown);

  let inner = null;

  if (messageBox !== null) {
    const { body, characterId, showCaretDown } = messageBox;
    const { name, color } = characterData[characterId];

    inner = (
      <>
        <img
          src={Assets.characters(characterId)}
          className="w-32 h-40"
          alt=""
        />
        <div className="flex-1 text-2xl pl-4">
          <div className={classNames('text-base mb-2', color)}>{name}</div>
          {body}
          {showCaretDown && (
            <img
              src={Assets.images.dialogCaretDown.toDataURL()}
              alt=""
              className="w-8 h-8 animate-ping mx-auto mt-8"
            />
          )}
        </div>
      </>
    );
  }

  return (
    <div className={positionClassMap[position]}>
      <div className={messageBox !== null ? '' : 'invisible'}>
        <MessageBox>
          <div className="flex w-[592px] h-[256px] text-2xl p-4">{inner}</div>
        </MessageBox>
      </div>
    </div>
  );
}
