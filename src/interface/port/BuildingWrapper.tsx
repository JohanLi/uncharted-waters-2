import React, { ReactNode } from 'react';

import Assets from '../../assets';
import DialogBox from '../common/DialogBox';

export type VendorMessage = {
  body: string;
  showCaretDown: boolean;
} | null;

interface Props {
  buildingId: string;
  vendorMessage: VendorMessage;
  menu?: ReactNode;
  children?: ReactNode;
}

export default function BuildingWrapper({
  buildingId,
  vendorMessage,
  menu,
  children,
}: Props) {
  const { body, showCaretDown } = vendorMessage || {};

  return (
    <div
      className="w-full h-full bg-[length:256px_128px]"
      style={{
        backgroundImage: `url('${Assets.images.buildingBackground.toDataURL()}')`,
      }}
    >
      <div className="flex">
        <div className="p-4 pr-0">
          <img
            src={Assets.buildings(buildingId)}
            alt=""
            className="w-[272px]"
          />
        </div>
        {Boolean(vendorMessage) && (
          <DialogBox className="w-[480px] h-[256px] text-2xl px-8 py-6">
            {body}
            {showCaretDown && (
              <img
                src={Assets.images.dialogCaretDown.toDataURL()}
                alt=""
                className="w-8 h-8 animate-ping mx-auto mt-8"
              />
            )}
          </DialogBox>
        )}
        {Boolean(menu) && <div className="mt-[190px]">{menu}</div>}
      </div>
      {children}
    </div>
  );
}

BuildingWrapper.defaultProps = {
  menu: null,
  children: null,
};
