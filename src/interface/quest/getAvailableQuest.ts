import state from '../../state/state';
import { finishedQuest } from '../../state/selectors';
import { QuestId } from './questData';

const getAvailableQuest = (): QuestId | null => {
  if (state.portId !== '1') {
    return null;
  }

  if (state.buildingId === '2') {
    if (!finishedQuest('questFromFather')) {
      if (!finishedQuest('pubBeforeQuest')) {
        return 'pubBeforeQuest';
      }

      return 'pubBeforeQuest2';
    }

    if (!finishedQuest('pubAfterQuest')) {
      return 'pubAfterQuest';
    }
  }

  if (state.buildingId === '5') {
    if (!finishedQuest('questFromFather')) {
      if (!finishedQuest('lodgeBankGuildBeforeQuestRandom1')) {
        return 'lodgeBankGuildBeforeQuestRandom1';
      }
    }
  }

  if (state.buildingId === '8') {
    if (!finishedQuest('questFromFather')) {
      return 'questFromFather';
    }

    return 'houseAfterQuest';
  }

  if (state.buildingId === '11') {
    if (!finishedQuest('questFromFather')) {
      if (!finishedQuest('churchBeforeQuest')) {
        return 'churchBeforeQuest';
      }
    }
  }

  return null;
};

export default getAvailableQuest;
