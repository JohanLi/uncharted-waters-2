import React, { ReactNode } from 'react';

import Assets from '../../assets';
import useQuestStep from '../quest/useQuestStep';
import CharacterMessageBox from './CharacterMessageBox';
import VendorMessageBox from './VendorMessageBox';
import useCaretDown from './hooks/useCaretDown';
import { VendorMessageBoxType } from '../quest/getMessageBoxes';

interface Props {
  buildingId: string;
  greeting: string;
  vendorMessageBox: VendorMessageBoxType;
  menu?: ReactNode;
  children?: ReactNode;
}

export default function BuildingWrapper(props: Props) {
  const { buildingId, greeting, menu, children } = props;
  let { vendorMessageBox } = props;

  const quest = useQuestStep();

  let characterDialogs: ReactNode;

  if (quest) {
    const { messageBoxes } = quest;
    [vendorMessageBox] = messageBoxes;

    if (messageBoxes.find((message) => message?.showCaretDown)) {
      useCaretDown(quest.next);
    }

    characterDialogs = (
      <>
        <CharacterMessageBox messageBox={messageBoxes[1]} position={1} />
        <CharacterMessageBox messageBox={messageBoxes[2]} position={2} />
      </>
    );
  } else if (!vendorMessageBox) {
    vendorMessageBox = {
      body: greeting,
    };
  }

  return (
    <div
      className="w-full h-full bg-[length:256px_128px]"
      style={{
        backgroundImage: `url('${Assets.images.buildingBackground.toDataURL()}')`,
      }}
    >
      <VendorMessageBox buildingId={buildingId} messageBox={vendorMessageBox} />
      {!quest && !!menu && (
        <div className="absolute top-[190px] left-[768px]">{menu}</div>
      )}
      {characterDialogs}
      {children}
    </div>
  );
}

BuildingWrapper.defaultProps = {
  menu: null,
  children: null,
};
