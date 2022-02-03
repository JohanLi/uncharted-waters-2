/* eslint-disable jsx-a11y/no-autofocus */

import React, { ChangeEvent, FormEvent, useState } from 'react';

import Assets from '../../../assets';
import MessageBox from '../../common/MessageBox';
import { classNames } from '../../interfaceUtils';
import useCancel from '../hooks/useCancel';

interface Props {
  onSubmit: (name: string) => void;
  onCancel: () => void;
}

export default function ShipyardShipNameInput({ onSubmit, onCancel }: Props) {
  const [name, setName] = useState('');

  useCancel(onCancel);

  return (
    <div className="absolute top-[500px] left-[96px]">
      <MessageBox>
        <div className="w-[450px] text-2xl p-4">
          <div className="mb-4">Ship name?</div>
          <form
            className="flex items-end mt-4"
            onSubmit={(e: FormEvent) => {
              e.preventDefault();
              onSubmit(name);
            }}
          >
            <div className="flex-1 pr-4">
              <input
                className={classNames(
                  'w-full px-4 py-2',
                  'border-2 border-[#d34100]',
                  'focus:outline-none focus:ring-4 focus:ring-[#f3a261]',
                )}
                type="text"
                required
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
                autoFocus
              />
            </div>
            <button type="submit">
              <img
                src={Assets.images.dialogSubmit.toDataURL()}
                alt=""
                className="w-[92px] h-[44px]"
              />
            </button>
          </form>
        </div>
      </MessageBox>
    </div>
  );
}
