import React from 'react';

import Assets from '../../assets';
import { classNames } from '../interfaceUtils';

export type UpperOrLower = 1 | 2;

export type Message = {
  body: string;
  characterId: string;
  upperOrLower: UpperOrLower;
};

type CharacterData = {
  [key: string]: {
    name: string;
    color: string;
  };
};

const characterData: CharacterData = {
  '1': {
    name: 'João Franco',
    color: 'text-blue-600',
  },
  '19': {
    name: 'Duke Franco',
    color: 'text-red-600',
  },
  '32': {
    name: 'Old Sea Hand Rocco',
    color: 'text-amber-800',
  },
};

interface Props {
  message: Pick<Message, 'body' | 'characterId'>;
}

export default function MessageBody({ message }: Props) {
  const { characterId } = message;
  const { name, color } = characterData[characterId];

  const body = message.body
    .replace('$firstName', 'João')
    .replace('$lastName', 'Franco');

  return (
    <div className="flex w-[592px] h-[256px] text-2xl p-4">
      <img src={Assets.characters(characterId)} className="w-32 h-40" alt="" />
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
    </div>
  );
}
