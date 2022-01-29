import React from 'react';

import Assets from '../../assets';
import { classNames } from '../interfaceUtils';
import DialogBox from '../common/DialogBox';
import { CharacterMessageDialog } from './messagesAtStep';

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

interface Props {
  message: CharacterMessageDialog;
}

export default function MessageDialog({ message }: Props) {
  let inner = null;

  if (message !== null) {
    const { body, characterId } = message;
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
          {Boolean(body) && (
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
    <div className={message !== null ? '' : 'invisible'}>
      <DialogBox>
        <div className="flex w-[592px] h-[256px] text-2xl p-4">{inner}</div>
      </DialogBox>
    </div>
  );
}
