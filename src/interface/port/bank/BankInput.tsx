/* eslint-disable jsx-a11y/no-autofocus */

import React, { ChangeEvent, FormEvent, useState } from 'react';

import MessageBox from '../../common/MessageBox';
import { classNames } from '../../interfaceUtils';
import Assets from '../../../assets';
import useCancel from '../hooks/useCancel';

interface Props {
  limit: number;
  onComplete: (value: number) => void;
  onCancel: () => void;
}

export default function BankInput({ limit, onComplete, onCancel }: Props) {
  const [value, setValue] = useState(0);

  useCancel(onCancel);

  return (
    <div className="absolute top-[500px] left-[96px]">
      <MessageBox>
        <div className="w-[450px] text-2xl p-4">
          <form
            className="flex items-end mt-4"
            onSubmit={(e: FormEvent) => {
              e.preventDefault();
              onComplete(value);
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
                value={value || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  if (Number.isNaN(e.target.value)) {
                    return;
                  }

                  let amount = Number(e.target.value);
                  amount = Math.max(0, amount);
                  amount = Math.min(limit, amount);

                  setValue(amount);
                }}
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
