import React, { ReactNode } from 'react';

import Assets from '../../assets';
import useQuestStep from '../quest/useQuestStep';
import CharacterMessageBox from './CharacterMessageBox';
import VendorMessageBox from './VendorMessageBox';
import {
  CharacterMessageBoxType,
  MessageBoxes,
  VendorMessageBoxType,
} from '../quest/getMessageBoxes';
import Confirm from '../common/Confirm';
import Acknowledge from '../common/Acknowledge';

interface Props {
  buildingId: string;
  vendorMessageBox: VendorMessageBoxType;
  characterMessageBox?: CharacterMessageBoxType;
  menu?: ReactNode;
  menu2?: ReactNode;
  dark?: boolean;
  children?: ReactNode;
}

export default function BuildingWrapper(props: Props) {
  const {
    buildingId,
    vendorMessageBox,
    characterMessageBox = null,
    dark = false,
    children,
  } = props;
  let { menu, menu2 } = props;
  let messageBoxes: MessageBoxes;

  const quest = useQuestStep();

  if (quest) {
    ({ messageBoxes } = quest);

    menu = null;
    menu2 = null;
  } else {
    messageBoxes = [vendorMessageBox, null, characterMessageBox];
  }

  const { acknowledge } =
    messageBoxes.find((messageBox) => !!messageBox?.acknowledge) || {};

  const { confirm } =
    messageBoxes.find((messageBox) => !!messageBox?.confirm) || {};

  if (!dark) {
    return (
      <div
        className="w-full h-full bg-[length:256px_128px]"
        style={{
          backgroundImage: `url('${Assets.images(
            'buildingBackground',
          ).toDataURL()}')`,
        }}
        data-test="building"
      >
        <VendorMessageBox
          buildingId={buildingId}
          messageBox={messageBoxes[0]}
        />
        <CharacterMessageBox messageBox={messageBoxes[1]} position={1} />
        <CharacterMessageBox messageBox={messageBoxes[2]} position={2} />
        {!!menu && (
          <div className="absolute top-[190px] left-[768px]">{menu}</div>
        )}
        {!!menu2 && (
          <div className="absolute top-[190px] left-[696px]">{menu2}</div>
        )}
        {children}
        {!!confirm && (
          <Confirm
            onYes={confirm.yes}
            onNo={confirm.no}
            initialPosition={{
              x: 760,
              y: 290,
            }}
          />
        )}
        {!!acknowledge && <Acknowledge onAcknowledge={acknowledge} />}
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-[length:256px_128px]" data-test="building">
      <CharacterMessageBox messageBox={messageBoxes[2]} position={2} />
      {children}
      {!!confirm && (
        <Confirm
          onYes={confirm.yes}
          onNo={confirm.no}
          initialPosition={{
            x: 760,
            y: 290,
          }}
        />
      )}
      {!!acknowledge && <Acknowledge onAcknowledge={acknowledge} />}
    </div>
  );
}
