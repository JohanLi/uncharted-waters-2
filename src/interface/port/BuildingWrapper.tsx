import React, { ReactNode } from 'react';

import Assets from '../../assets';
import DialogBox from '../common/DialogBox';
import useQuestStep from '../quest/useQuestStep';
import MessageDialog from '../quest/MessageDialog';
import { VendorMessageDialog } from '../quest/messagesAtStep';

interface Props {
  buildingId: string;
  greeting: string;
  vendorMessage: VendorMessageDialog | null;
  menu?: ReactNode;
  children?: ReactNode;
}

export default function BuildingWrapper(props: Props) {
  const { buildingId, greeting, menu, children } = props;
  let { vendorMessage } = props;
  let vendorShowCaretDown = true;

  const quest = useQuestStep();

  if (quest) {
    vendorMessage = quest.vendor;
  } else if (!vendorMessage) {
    vendorMessage = {
      body: greeting,
    };
    vendorShowCaretDown = false;
  }

  return (
    <div
      className="w-full h-full bg-[length:256px_128px]"
      style={{
        backgroundImage: `url('${Assets.images.buildingBackground.toDataURL()}')`,
      }}
    >
      <div className="flex items-start">
        <div className="p-4 pr-0">
          <img
            src={Assets.buildings(buildingId)}
            alt=""
            className="w-[272px]"
          />
        </div>
        <div className={vendorMessage !== null ? '' : 'invisible'}>
          <DialogBox>
            <div className="w-[448px] h-[224px] text-2xl px-4 py-2">
              {vendorMessage !== null && (
                <>
                  {vendorMessage.body}
                  {!!vendorMessage.body && vendorShowCaretDown && (
                    <img
                      src={Assets.images.dialogCaretDown.toDataURL()}
                      alt=""
                      className="w-8 h-8 animate-ping mx-auto mt-8"
                    />
                  )}
                </>
              )}
            </div>
          </DialogBox>
        </div>
        {!quest && !!menu && <div className="mt-[190px]">{menu}</div>}
      </div>
      {!!quest && (
        <div className="absolute top-4 left-[304px]">
          <MessageDialog message={quest.upper} />
        </div>
      )}
      {!!quest && (
        <div className="absolute top-[320px] ml-[416px]">
          <MessageDialog message={quest.lower} />
        </div>
      )}
      {children}
    </div>
  );
}

BuildingWrapper.defaultProps = {
  menu: null,
  children: null,
};
