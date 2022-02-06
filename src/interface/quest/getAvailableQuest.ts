import state from '../../state/state';
import { finishedQuest } from '../../state/selectors';
import { QuestId } from './questData';
import { sample } from '../../utils';

const between22and24 = (timePassed: number) => {
  const timePassedToday = timePassed % 1440;

  return timePassedToday >= 1320 || timePassedToday === 0;
};

const getAvailableQuest = (): QuestId | null => {
  const { portId, buildingId, timePassed } = state;

  if (portId !== '1' || !buildingId) {
    return null;
  }

  if (buildingId === '8') {
    if (!finishedQuest('houseBeforeQuest')) {
      return 'houseBeforeQuest';
    }

    if (!finishedQuest('houseAfterQuestAndPub')) {
      if (finishedQuest('pubAfterQuest') && between22and24(timePassed)) {
        return 'houseAfterQuestAndPub';
      }
      return 'houseAfterQuest';
    }

    return 'houseAfterQuestAndPub2';
  }

  if (buildingId === '2') {
    if (!finishedQuest('houseBeforeQuest')) {
      if (!finishedQuest('pubBeforeQuest')) {
        return 'pubBeforeQuest';
      }

      return 'pubBeforeQuest2';
    }

    if (!finishedQuest('pubAfterQuest')) {
      return 'pubAfterQuest';
    }

    if (!finishedQuest('houseAfterQuestAndPub')) {
      return 'pubAfterQuest2';
    }
  }

  if (['5', '7', '9'].includes(buildingId)) {
    if (!finishedQuest('houseBeforeQuest')) {
      return sample([
        'lodgeBankGuildBeforeQuestRandom1',
        'lodgeBankGuildBeforeQuestRandom2',
        'lodgeBankGuildBeforeQuestRandom3',
      ]);
    }

    return sample([
      'lodgeBankGuildAfterQuestRandom1',
      'lodgeBankGuildAfterQuestRandom2',
      'lodgeBankGuildAfterQuestRandom3',
    ]);
  }

  if (buildingId === '6') {
    if (!finishedQuest('houseBeforeQuest')) {
      return 'palaceBeforeQuest';
    }

    return 'palaceAfterQuest';
  }

  if (buildingId === '10') {
    if (!finishedQuest('houseBeforeQuest')) {
      return 'itemShopBeforeQuest';
    }

    if (!finishedQuest('itemShopAfterQuest')) {
      return 'itemShopAfterQuest';
    }

    return 'itemShopAfterQuest2';
  }

  if (buildingId === '3') {
    if (!finishedQuest('houseBeforeQuest')) {
      return 'shipyardBeforeQuest';
    }

    if (!finishedQuest('shipyardAfterQuest')) {
      return 'shipyardAfterQuest';
    }

    return null;
  }

  if (buildingId === '11') {
    if (!finishedQuest('houseBeforeQuest')) {
      if (!finishedQuest('churchBeforeQuest')) {
        return 'churchBeforeQuest';
      }

      return 'churchBeforeQuest2';
    }

    if (!finishedQuest('churchAfterEnrico')) {
      if (!finishedQuest('churchAfterQuest')) {
        return 'churchAfterQuest';
      }

      return 'churchAfterEnrico';
    }

    return 'churchAfterEnricoAfterGift';
  }

  if (buildingId === '1') {
    if (!finishedQuest('houseBeforeQuest')) {
      return 'marketBeforeQuest';
    }

    if (!finishedQuest('shipyardAfterQuest')) {
      return 'marketAfterQuestBeforeShip';
    }

    return null;
  }

  if (buildingId === '4') {
    if (!finishedQuest('houseBeforeQuest')) {
      return 'harborBeforeQuest';
    }

    if (!finishedQuest('shipyardAfterQuest')) {
      return 'harborBeforeShip';
    }

    if (!finishedQuest('churchAfterQuest')) {
      return 'harborBeforeEnrico';
    }

    if (!finishedQuest('pubAfterQuest')) {
      if (!finishedQuest('churchAfterEnrico')) {
        return 'harborAfterEnrico';
      }

      return 'harborAfterEnrico2';
    }

    if (!finishedQuest('houseAfterQuestAndPub')) {
      return 'harborAfterEnricoBeforeMother';
    }

    if (!finishedQuest('harborFinal')) {
      return 'harborFinal';
    }
  }

  return null;
};

export default getAvailableQuest;
