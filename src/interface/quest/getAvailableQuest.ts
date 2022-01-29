import state from '../../state/state';
import { finishedQuest } from '../../state/selectors';

const getAvailableQuest = () => {
  if (state.portId === 0) {
    return null;
  }

  if (state.buildingId === '2') {
    if (!finishedQuest('obtainedQuestFromFather')) {
      if (!finishedQuest('pubBeforeQuest')) {
        return 'pubBeforeQuest';
      }

      return 'pubBeforeQuestHeadHome';
    }

    if (!finishedQuest('pubAfterQuest')) {
      return 'pubAfterQuest';
    }
  }

  if (state.buildingId === '5') {
    if (!finishedQuest('obtainedQuestFromFather')) {
      if (!finishedQuest('lodgeBeforeQuest')) {
        return 'lodgeBeforeQuest';
      }
    }
  }

  if (state.buildingId === '8') {
    if (!finishedQuest('obtainedQuestFromFather')) {
      return 'obtainedQuestFromFather';
    }

    return 'expelled';
  }

  if (state.buildingId === '11') {
    if (!finishedQuest('obtainedQuestFromFather')) {
      if (!finishedQuest('churchBeforeQuest')) {
        return 'churchBeforeQuest';
      }
    }
  }

  return null;
};

export default getAvailableQuest;
