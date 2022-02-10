import { getPortData } from '../../../game/port/portUtils';
import { shipyardsToShips } from '../../../data/portShipyardData';
import { generateId, random, sample } from '../../../utils';
import { UsedShips } from '../../../state/state';

const generateUsedShips = (portId: string) => {
  const port = getPortData(portId);

  if (port.isSupplyPort) {
    throw Error('Supply port was provided');
  }

  const { industryId, industry } = port;
  const shipPool = shipyardsToShips[industryId];

  const shipPoolMeetingRequirements = shipPool
    .filter(({ industryRequirement }) => industry >= industryRequirement)
    .map(({ shipId }) => shipId);

  let amount = 2;

  if (industry > 800) {
    amount = random(2, 8);
  } else if (industry > 600) {
    amount = random(2, 6);
  } else if (industry > 400) {
    amount = random(2, 4);
  }

  const usedShips: UsedShips = {};

  for (let i = 0; i < amount; i += 1) {
    usedShips[generateId()] = sample(shipPoolMeetingRequirements);
  }

  return usedShips;
};

export default generateUsedShips;
