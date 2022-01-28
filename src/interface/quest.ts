import state from '../state/state';
import { finishedQuest } from '../state/selectors';
import { Quests } from '../data/questData';

const getQuest = () => {
  if (state.portId === 0) {
    return null;
  }

  if (state.buildingId === '8') {
    if (!finishedQuest(Quests.spokenToFather)) {
      return Quests.spokenToFather;
    }

    return Quests.expelled;
  }

  if (state.buildingId === '2') {
    if (!finishedQuest(Quests.spokenToFather)) {
      if (!finishedQuest(Quests.pubFirstVisit)) {
        return Quests.pubFirstVisit;
      }

      return Quests.pubHeadHome;
    }

    if (!finishedQuest(Quests.pubAfterQuest)) {
      return Quests.pubAfterQuest;
    }
  }

  return null;
};

export default getQuest;
