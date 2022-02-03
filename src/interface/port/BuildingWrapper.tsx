import React, { ReactNode } from 'react';

import Assets from '../../assets';
import useQuestStep from '../quest/useQuestStep';
import CharacterMessageBox from './CharacterMessageBox';
import VendorMessageBox from './VendorMessageBox';
import { VendorMessageBoxType } from '../quest/getMessageBoxes';

interface Props {
  buildingId: string;
  vendorMessageBox: VendorMessageBoxType;
  menu?: ReactNode;
  menu2?: ReactNode;
  children?: ReactNode;
}

export default function BuildingWrapper(props: Props) {
  const { buildingId, children } = props;
  let { vendorMessageBox, menu, menu2 } = props;

  const quest = useQuestStep();

  let characterDialogs: ReactNode;

  if (quest) {
    const { messageBoxes } = quest;

    [vendorMessageBox] = messageBoxes;

    characterDialogs = (
      <>
        <CharacterMessageBox messageBox={messageBoxes[1]} position={1} />
        <CharacterMessageBox messageBox={messageBoxes[2]} position={2} />
      </>
    );

    menu = null;
    menu2 = null;
  }

  return (
    <div
      className="w-full h-full bg-[length:256px_128px]"
      style={{
        backgroundImage: `url('${Assets.images.buildingBackground.toDataURL()}')`,
      }}
    >
      <VendorMessageBox buildingId={buildingId} messageBox={vendorMessageBox} />
      {menu !== null && (
        <div className="absolute top-[190px] left-[768px]">{menu}</div>
      )}
      {menu2 !== null && (
        <div className="absolute top-[190px] left-[696px]">{menu2}</div>
      )}
      {characterDialogs}
      {children}
    </div>
  );
}
