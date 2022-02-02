import React, { ReactNode } from 'react';

import Assets from '../../assets';
import useQuestStep from '../quest/useQuestStep';
import CharacterMessageBox from './CharacterMessageBox';
import VendorMessageBox from './VendorMessageBox';
import useCaretDown from './hooks/useCaretDown';
import { VendorMessageBoxType } from '../quest/getMessageBoxes';
import useCancel from './hooks/useCancel';

interface Props {
  buildingId: string;
  vendorMessageBox: VendorMessageBoxType;
  menu?: ReactNode;
  children?: ReactNode;
  back: () => void;
  backActive: boolean;
  next: () => void;
}

export default function BuildingWrapper(props: Props) {
  const { buildingId, menu, children, back, backActive, next } = props;
  let { vendorMessageBox } = props;

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

    const active = !!messageBoxes.find((message) => message?.showCaretDown);
    useCaretDown(quest.next, active);
  } else {
    useCancel(back, backActive);
    const active = !!vendorMessageBox?.showCaretDown;
    useCaretDown(next, active);
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
