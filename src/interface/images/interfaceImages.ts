import dialogCorner from './dialogCorner.png';
import dialogCaretDown from './dialogCaretDown.png';
import dialogShip from './dialogShip.png';
import dialogYes from './dialogYes.png';
import dialogNo from './dialogNo.png';
import dialogSubmit from './dialogSubmit.png';
import buildingBackground from './buildingBackground.png';
import buildings from './buildings.png';
import characters from './characters.png';
import worldIndicators from './worldIndicators.png';
import worldWater from './worldWater.png';
import worldFood from './worldFood.png';
import worldLumber from './worldLumber.png';
import worldShot from './worldShot.png';
import ships from './ships.png';

const interfaceImages = {
  dialogCorner,
  dialogCaretDown,
  dialogShip,
  dialogYes,
  dialogNo,
  dialogSubmit,
  buildingBackground,
  buildings,
  characters,
  worldIndicators,
  worldWater,
  worldFood,
  worldLumber,
  worldShot,
  ships,
};

export type InterfaceImages = keyof typeof interfaceImages;

export default interfaceImages;
