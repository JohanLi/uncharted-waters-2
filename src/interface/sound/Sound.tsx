/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { useEffect, useRef, useState } from 'react';

import { getRegionOrIfSupplyPort } from '../../port/portUtils';

import mastInTheMist from './assets/mast-in-the-mist.ogg';
import themeOfJoao from './assets/theme-of-joão.ogg';
import fiddlersGreen from './assets/fiddlers-green.ogg';
import royalPalace from './assets/royal-palace.ogg';
import supplyPort from './assets/supply-port.ogg';
import emptyEyes from './assets/empty-eyes.ogg';
import theMahout from './assets/the-mahout.ogg';
import landOfLuxury from './assets/land-of-luxury.ogg';
import moslemDance from './assets/moslem-dance.ogg';

interface Props {
  portId: string | null;
  buildingId: string | null;
}

const getSound = ({ portId, buildingId }: Props) => {
  if (portId === null) {
    return themeOfJoao;
  }

  if (buildingId === '2') {
    return fiddlersGreen;
  }

  if (buildingId === '6') {
    return royalPalace;
  }

  const region = getRegionOrIfSupplyPort(portId);

  if (region === 'Supply port') {
    return supplyPort;
  }

  if (['Ottoman Empire', 'Middle East'].includes(region)) {
    return moslemDance;
  }

  if (
    [
      'North Africa',
      'East Africa',
      'West Africa',
      'Central America',
      'South America',
    ].includes(region)
  ) {
    return emptyEyes;
  }

  if (['India'].includes(region)) {
    return theMahout;
  }

  if (['Southeast Asia', 'Far East'].includes(region)) {
    return landOfLuxury;
  }

  return mastInTheMist;
};

export default function Sound({ portId, buildingId }: Props) {
  const audioRef = useRef(new Audio());

  const [soundOn, setSoundOn] = useState(true);
  const [currentSound, setCurrentSound] = useState<string>();

  useEffect(() => {
    const sound = getSound({ portId, buildingId });
    setCurrentSound(sound);
  }, [portId, buildingId]);

  useEffect(() => {
    if (!audioRef.current || !currentSound) {
      return;
    }

    audioRef.current.muted = !soundOn;

    audioRef.current.loop = true;
    audioRef.current.src = currentSound;
    audioRef.current.play();
  }, [soundOn, currentSound]);

  return (
    <div
      className="select-none cursor-pointer p-2 inline-block align-bottom"
      onClick={() => setSoundOn(!soundOn)}
    >
      {soundOn && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-lime-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
            clipRule="evenodd"
          />
        </svg>
      )}
      {!soundOn && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-red-600"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </div>
  );
}
