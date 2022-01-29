import state from '../../state/state';
import { finishedQuest } from '../../state/selectors';
import { Quests } from './questData';

const getAvailableQuest = () => {
  if (state.portId === 0) {
    return null;
  }

  if (state.buildingId === '2') {
    if (!finishedQuest(Quests.obtainedQuestFromFather)) {
      if (!finishedQuest(Quests.pubBeforeQuest)) {
        return Quests.pubBeforeQuest;
      }

      return Quests.pubBeforeQuestHeadHome;
    }

    if (!finishedQuest(Quests.pubAfterQuest)) {
      return Quests.pubAfterQuest;
    }
  }

  if (state.buildingId === '5') {
    if (!finishedQuest(Quests.obtainedQuestFromFather)) {
      if (!finishedQuest(Quests.lodgeBeforeQuest)) {
        return Quests.lodgeBeforeQuest;
      }
    }
  }

  if (state.buildingId === '8') {
    if (!finishedQuest(Quests.obtainedQuestFromFather)) {
      return Quests.obtainedQuestFromFather;
    }

    return Quests.expelled;
  }

  if (state.buildingId === '11') {
    if (!finishedQuest(Quests.obtainedQuestFromFather)) {
      if (!finishedQuest(Quests.churchBeforeQuest)) {
        return Quests.churchBeforeQuest;
      }
    }
  }

  return null;
};

export default getAvailableQuest;
