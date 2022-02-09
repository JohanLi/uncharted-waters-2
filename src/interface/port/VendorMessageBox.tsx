import React from 'react';

import MessageBox from '../common/MessageBox';
import Assets from '../../assets';
import { VendorMessageBoxType } from '../quest/getMessageBoxes';

interface Props {
  buildingId: string;
  messageBox: VendorMessageBoxType;
}

export default function VendorMessageBox({ buildingId, messageBox }: Props) {
  return (
    <div className="flex" data-test="vendorMessageBox">
      <div className="p-4 pr-0">
        <img src={Assets.buildings(buildingId)} alt="" className="w-[272px]" />
      </div>
      <div className={messageBox !== null ? '' : 'invisible'}>
        <MessageBox>
          <div className="w-[448px] h-[224px] text-2xl px-4 py-2">
            {messageBox !== null && (
              <>
                {messageBox.body}
                {messageBox.acknowledge && (
                  <img
                    src={Assets.images.dialogCaretDown.toDataURL()}
                    alt=""
                    className="w-8 h-8 animate-ping mx-auto mt-8"
                  />
                )}
              </>
            )}
          </div>
        </MessageBox>
      </div>
    </div>
  );
}
