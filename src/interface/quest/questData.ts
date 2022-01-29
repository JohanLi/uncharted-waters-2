import { receiveGold } from '../../state/actionsPort';

type QuestsAct1 =
  | 'pubBeforeQuest'
  | 'pubBeforeQuestHeadHome'
  | 'lodgeBeforeQuest'
  | 'churchBeforeQuest'
  | 'obtainedQuestFromFather'
  | 'expelled'
  | 'pubAfterQuest';

export type Quests = QuestsAct1;

export type MessagePosition = 0 | 1 | 2;

export type Message = CharacterMessage | VendorMessage;

export type CharacterMessage = {
  body: string;
  characterId: string;
  messagePosition: Extract<MessagePosition, 1 | 2>;
  action?: () => void;
  completeQuest?: true;
  exitBuilding?: true;
};

export type VendorMessage = {
  body: string;
  characterId: null;
  messagePosition: Extract<MessagePosition, 0>;
  action?: () => void;
  completeQuest?: true;
  exitBuilding?: true;
};

const questData: { [key in Quests]: Message[] } = {
  pubBeforeQuest: [
    {
      body: 'Well isn’t this a rare treat, Master $firstName.',
      characterId: '98',
      messagePosition: 1,
    },
    {
      body: 'Hey $firstName, how about playing a tune for me on that lute of yours? I feel like singing!',
      characterId: '99',
      messagePosition: 1,
    },
    {
      body: 'Lucia! You should be more polite to the son of a noble.',
      characterId: '98',
      messagePosition: 1,
    },
    {
      body: 'Oh, don’t worry, Lucia and I have been friends forever!',
      characterId: '1',
      messagePosition: 2,
    },
    {
      body: 'By the way, $firstName, Rocco came by here looking for you. He said the Duke was calling for you.',
      characterId: '98',
      messagePosition: 1,
    },
    {
      body: 'My father? Well then, I apologize, but I’d better be going.',
      characterId: '1',
      messagePosition: 2,
    },
    {
      body: 'Oh, $firstName! You’re leaving already?!',
      characterId: '99',
      messagePosition: 1,
      completeQuest: true,
      exitBuilding: true,
    },
  ],
  pubBeforeQuestHeadHome: [
    {
      body: 'Master $firstName, I think you’d better be heading home now.',
      characterId: '98',
      messagePosition: 1,
      exitBuilding: true,
    },
  ],
  lodgeBeforeQuest: [
    {
      body: 'Well this is a surprise, Master $firstName. Are you avoiding something?',
      characterId: null,
      messagePosition: 0,
    },
    {
      body: 'You’re part of the $lastName family, so I guess you’ll be taking a trip soon, right?',
      characterId: null,
      messagePosition: 0,
    },
  ],
  churchBeforeQuest: [
    {
      body: 'Master $firstName, is there anyone in the Duke $lastName’s household that could possibly take a trip?',
      characterId: null,
      messagePosition: 0,
    },
    {
      body: 'I’m afraid not. My father is too busy, and I’ve no experience.',
      characterId: '1',
      messagePosition: 2,
    },
    {
      body: 'I’m looking for a reliable man to... Well, never mind.',
      characterId: null,
      messagePosition: 0,
    },
    {
      body: 'Oh, that reminds me, Rocco was here looking for you.',
      characterId: null,
      messagePosition: 0,
    },
    {
      body: 'I see. Well then, I guess I’ll go back to the house.',
      characterId: '1',
      messagePosition: 2,
      exitBuilding: true,
    },
  ],
  obtainedQuestFromFather: [
    {
      body: 'Father, did you send for me?',
      characterId: '1',
      messagePosition: 2,
    },
    {
      body: 'Ah, $firstName, I’ve been wanting to ask you a few questions.',
      characterId: '19',
      messagePosition: 1,
    },
    {
      body: 'First, has your fencing improved?',
      characterId: '19',
      messagePosition: 1,
    },
    {
      body: 'Yes, compared to before. But I think I’d be lucky to get just one point out of five if I were fighting you, Father.',
      characterId: '1',
      messagePosition: 2,
    },
    {
      body: 'And have you studied your sailing lessons?',
      characterId: '19',
      messagePosition: 1,
    },
    {
      body: 'Well, I finished my studies at school. But I can’t think of anything more useless than an education without practical experience. ',
      characterId: '1',
      messagePosition: 2,
    },
    {
      body: 'I see. Well then, have you mastered geography?',
      characterId: '19',
      messagePosition: 1,
    },
    {
      body: 'Well, since I’ve never been allowed to leave Lisbon, I only know what I’ve learned in books.',
      characterId: '1',
      messagePosition: 2,
    },
    {
      body: '$firstName, don’t knock textbooks. The advice of others can prove to be invaluable.',
      characterId: '19',
      messagePosition: 1,
    },
    {
      body: 'Yes sir.',
      characterId: '1',
      messagePosition: 2,
    },
    {
      body: 'Remember that, $firstName. And finally, how’s that lute coming along?',
      characterId: '19',
      messagePosition: 1,
    },
    {
      body: 'It’s just a hobby, Father. I’m not really good enough to play for audiences.',
      characterId: '1',
      messagePosition: 2,
    },
    {
      body: 'Really? Your mother has mentioned that you have a fairly good reputation with her friends.',
      characterId: '19',
      messagePosition: 1,
    },
    {
      body: 'You must be kidding.',
      characterId: '1',
      messagePosition: 2,
    },
    {
      body: 'Ha, ha, ha. I’ll have to have you play for me sometime.',
      characterId: '19',
      messagePosition: 1,
    },
    {
      body: 'Anyway $firstName, to get down to business...',
      characterId: '19',
      messagePosition: 1,
    },
    {
      body: 'Yes sir?',
      characterId: '1',
      messagePosition: 2,
    },
    {
      body: 'I have something very important to tell you today.',
      characterId: '19',
      messagePosition: 1,
    },
    {
      body: 'What is it, Father?',
      characterId: '1',
      messagePosition: 2,
    },
    {
      body: 'As you already know, when I was your age, I was already out on the open seas, fighting pirates and scoundrels.',
      characterId: '19',
      messagePosition: 1,
    },
    {
      body: 'I have heard the tales. (Here he goes again!)',
      characterId: '1',
      messagePosition: 2,
    },
    {
      body: 'Up until now, I have forbidden you to leave this harbor, due to your youth and inexperience.',
      characterId: '19',
      messagePosition: 1,
    },
    {
      body: 'However, the $lastName men cannot live on land forever.',
      characterId: '19',
      messagePosition: 1,
    },
    {
      body: 'You already have enough knowledge. What you need now is experience.',
      characterId: '19',
      messagePosition: 1,
    },
    {
      body: 'I want you to search for adventure, to live a life on the edge, like I did.',
      characterId: '19',
      messagePosition: 1,
    },
    {
      body: 'Yes sir!',
      characterId: '1',
      messagePosition: 2,
    },
    {
      body: 'Along with that I have an important task for you: Go and find the secret of Atlantis.',
      characterId: '19',
      messagePosition: 1,
    },
    {
      body: 'The secret of Atlantis? What do you mean?',
      characterId: '1',
      messagePosition: 2,
    },
    {
      body: 'Well, that’s something you’ll have to discover on your own, son!',
      characterId: '19',
      messagePosition: 1,
    },
    {
      body: 'It’s a difficult task, and there may be hardships along the way, but it’s urgent that you find it.',
      characterId: '19',
      messagePosition: 1,
    },
    {
      body: 'Furthermore, I’ve ordered the townspeople to treat you like a commoner from now on, so prepare yourself for that as well.',
      characterId: '19',
      messagePosition: 1,
    },
    {
      body: 'Your ship is being built even now. You’ll be leaving soon, so you’d better get ready at once. Good luck son, make me proud!',
      characterId: '19',
      messagePosition: 1,
    },
    {
      body: 'Rocco! Rocco! Where are you?!',
      characterId: '19',
      messagePosition: 1,
    },
    {
      body: 'Ahoy, sir, I’m right here.',
      characterId: '32',
      messagePosition: 2,
    },
    {
      body: 'I’m leaving you in charge of his education. Teach him how to be a true sailor.',
      characterId: '19',
      messagePosition: 1,
    },
    {
      body: 'Righto Cap’n, I mean, Duke, sir.',
      characterId: '32',
      messagePosition: 2,
    },
    {
      body: 'Don’t go easy on him because he’s my son. Forge him into a man, Rocco.',
      characterId: '19',
      messagePosition: 1,
    },
    {
      body: 'Come along now, swabbie, let’s get to the shipyard.',
      characterId: '32',
      messagePosition: 2,
    },
    {
      body: 'Righto, Rocco, but first I’ve got to say good-bye to Lucia and Carlotta.',
      characterId: '1',
      messagePosition: 2,
      completeQuest: true,
      exitBuilding: true,
    },
  ],
  expelled: [
    {
      body: 'I’m awfully sorry, but the Duke’s orders were quite specific. You are not to enter the house.',
      characterId: '7',
      messagePosition: 1,
      exitBuilding: true,
    },
  ],
  pubAfterQuest: [
    {
      body: 'Master $firstName, what’s going on? The whole town is in an uproar.',
      characterId: '98',
      messagePosition: 1,
    },
    {
      body: 'Are you really going to leave on a sea voyage?',
      characterId: '99',
      messagePosition: 1,
    },
    {
      body: 'I’m afraid so. It’s the $lastName tradition, after all.',
      characterId: '1',
      messagePosition: 2,
    },
    {
      body: 'Except, I’m not sure what we’re going to do about money.',
      characterId: '1',
      messagePosition: 2,
    },
    {
      body: 'Why not become a traveling band? I’d be happy to sing for you!',
      characterId: '99',
      messagePosition: 1,
    },
    {
      body: 'Come now, Lucia, stop your nonsense.',
      characterId: '98',
      messagePosition: 1,
    },
    {
      body: 'Master $firstName, here is 1000 gold pieces. Please, take it.',
      characterId: '98',
      messagePosition: 1,
    },
    {
      body: 'Here I thought this pub wasn’t popular at all, but ye’ve managed to save up quite a little bit.',
      characterId: '32',
      messagePosition: 1,
    },
    {
      body: 'Thanks. Sorry we’re not up to your standards, Rocco.',
      characterId: '98',
      messagePosition: 1,
    },
    {
      body: 'Master $firstName, please, accept this gift.',
      characterId: '98',
      messagePosition: 1,
    },
    {
      body: 'No, I’m sorry, but I can’t. I wouldn’t be able to return it to you.',
      characterId: '1',
      messagePosition: 2,
    },
    {
      body: 'Don’t worry about that. Actually, I’m not supposed to say this, but this money is really from your father, the Duke.',
      characterId: '98',
      messagePosition: 1,
    },
    {
      body: 'He said, ’Please give this to $firstName if he stops by to see you.’',
      characterId: '98',
      messagePosition: 1,
    },
    {
      body: 'My father...?',
      characterId: '1',
      messagePosition: 2,
      action: () => {
        receiveGold(1000);
      },
    },
    {
      body: 'This is all well and good, but we’ll be needing a little more money if ye wants to get further than Lisbon...',
      characterId: '32',
      messagePosition: 1,
    },
    {
      body: 'Shiver me timbers! Why didn’t I think of this earlier? Ye mother will help ye!',
      characterId: '32',
      messagePosition: 1,
    },
    {
      body: 'But how? I’m not even allowed inside the house.',
      characterId: '1',
      messagePosition: 2,
    },
    {
      body: 'Don’t worry. I’ll take a message for you.',
      characterId: '99',
      messagePosition: 2,
    },
    {
      body: 'Lucia!',
      characterId: '1',
      messagePosition: 2,
    }, // TODO delay effect
    {
      body: 'I’m back.',
      characterId: '99',
      messagePosition: 1,
    },
    {
      body: 'So, missie, how’d it go?',
      characterId: '32',
      messagePosition: 1,
    },
    {
      body: 'She wants you to come to the house between 10 and 12 at night.',
      characterId: '99',
      messagePosition: 1,
    },
    {
      body: 'Thanks for the advice Carlotta. Thank you Lucia.',
      characterId: '1',
      messagePosition: 2,
      exitBuilding: true,
    },
  ],
};

export default questData;
