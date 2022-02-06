import { receiveGold } from '../../state/actionsPort';
import { asInferredKeysWithValue } from '../../utils';

export const messagePositions = [0, 1, 2] as const;
export type MessagePosition = typeof messagePositions[number];

export type Message = VendorMessage | CharacterMessage;

export type VendorMessage = {
  position: Extract<MessagePosition, 0>;
} & MessageCommon;

export type CharacterMessage = {
  characterId: string;
  position: Extract<MessagePosition, 1 | 2>;
} & MessageCommon;

type MessageCommon = {
  body: string;
  action?: () => void;
  completeQuest?: true;
  exitBuilding?: true;
  confirm?: {
    yes: () => void;
    no: () => void;
  };
  fadeBeforeNext?: true;
};

const questData = asInferredKeysWithValue<Message[]>()({
  houseBeforeQuest: [
    {
      body: 'Father, did you send for me?',
      characterId: '1',
      position: 2,
    },
    {
      body: 'Ah, $firstName, I’ve been wanting to ask you a few questions.',
      characterId: '19',
      position: 1,
    },
    {
      body: 'First, has your fencing improved?',
      characterId: '19',
      position: 1,
    },
    {
      body: 'Yes, compared to before. But I think I’d be lucky to get just one point out of five if I were fighting you, Father.',
      characterId: '1',
      position: 2,
    },
    {
      body: 'And have you studied your sailing lessons?',
      characterId: '19',
      position: 1,
    },
    {
      body: 'Well, I finished my studies at school. But I can’t think of anything more useless than an education without practical experience. ',
      characterId: '1',
      position: 2,
    },
    {
      body: 'I see. Well then, have you mastered geography?',
      characterId: '19',
      position: 1,
    },
    {
      body: 'Well, since I’ve never been allowed to leave Lisbon, I only know what I’ve learned in books.',
      characterId: '1',
      position: 2,
    },
    {
      body: '$firstName, don’t knock textbooks. The advice of others can prove to be invaluable.',
      characterId: '19',
      position: 1,
    },
    {
      body: 'Yes sir.',
      characterId: '1',
      position: 2,
    },
    {
      body: 'Remember that, $firstName. And finally, how’s that lute coming along?',
      characterId: '19',
      position: 1,
    },
    {
      body: 'It’s just a hobby, Father. I’m not really good enough to play for audiences.',
      characterId: '1',
      position: 2,
    },
    {
      body: 'Really? Your mother has mentioned that you have a fairly good reputation with her friends.',
      characterId: '19',
      position: 1,
    },
    {
      body: 'You must be kidding.',
      characterId: '1',
      position: 2,
    },
    {
      body: 'Ha, ha, ha. I’ll have to have you play for me sometime.',
      characterId: '19',
      position: 1,
    },
    {
      body: 'Anyway $firstName, to get down to business...',
      characterId: '19',
      position: 1,
    },
    {
      body: 'Yes sir?',
      characterId: '1',
      position: 2,
    },
    {
      body: 'I have something very important to tell you today.',
      characterId: '19',
      position: 1,
    },
    {
      body: 'What is it, Father?',
      characterId: '1',
      position: 2,
    },
    {
      body: 'As you already know, when I was your age, I was already out on the open seas, fighting pirates and scoundrels.',
      characterId: '19',
      position: 1,
    },
    {
      body: 'I have heard the tales. (Here he goes again!)',
      characterId: '1',
      position: 2,
    },
    {
      body: 'Up until now, I have forbidden you to leave this harbor, due to your youth and inexperience.',
      characterId: '19',
      position: 1,
    },
    {
      body: 'However, the $lastName men cannot live on land forever.',
      characterId: '19',
      position: 1,
    },
    {
      body: 'You already have enough knowledge. What you need now is experience.',
      characterId: '19',
      position: 1,
    },
    {
      body: 'I want you to search for adventure, to live a life on the edge, like I did.',
      characterId: '19',
      position: 1,
    },
    {
      body: 'Yes sir!',
      characterId: '1',
      position: 2,
    },
    {
      body: 'Along with that I have an important task for you: Go and find the secret of Atlantis.',
      characterId: '19',
      position: 1,
    },
    {
      body: 'The secret of Atlantis? What do you mean?',
      characterId: '1',
      position: 2,
    },
    {
      body: 'Well, that’s something you’ll have to discover on your own, son!',
      characterId: '19',
      position: 1,
    },
    {
      body: 'It’s a difficult task, and there may be hardships along the way, but it’s urgent that you find it.',
      characterId: '19',
      position: 1,
    },
    {
      body: 'Furthermore, I’ve ordered the townspeople to treat you like a commoner from now on, so prepare yourself for that as well.',
      characterId: '19',
      position: 1,
    },
    {
      body: 'Your ship is being built even now. You’ll be leaving soon, so you’d better get ready at once. Good luck son, make me proud!',
      characterId: '19',
      position: 1,
    },
    {
      body: 'Rocco! Rocco! Where are you?!',
      characterId: '19',
      position: 1,
    },
    {
      body: 'Ahoy, sir, I’m right here.',
      characterId: '32',
      position: 2,
    },
    {
      body: 'I’m leaving you in charge of his education. Teach him how to be a true sailor.',
      characterId: '19',
      position: 1,
    },
    {
      body: 'Righto Cap’n, I mean, Duke, sir.',
      characterId: '32',
      position: 2,
    },
    {
      body: 'Don’t go easy on him because he’s my son. Forge him into a man, Rocco.',
      characterId: '19',
      position: 1,
    },
    {
      body: 'Come along now, swabbie, let’s get to the shipyard.',
      characterId: '32',
      position: 2,
    },
    {
      body: 'Righto, Rocco, but first I’ve got to say good-bye to Lucia and Carlotta.',
      characterId: '1',
      position: 2,
      completeQuest: true,
      exitBuilding: true,
    },
  ],
  houseAfterQuest: [
    {
      body: 'I’m awfully sorry, but the Duke’s orders were quite specific. You are not to enter the house.',
      characterId: '7',
      position: 1,
      exitBuilding: true,
    },
  ],
  // between 22 and 24
  houseAfterQuestAndPub: [
    {
      body: 'Oh $firstName, I just can’t understand why your father must forbid you from coming in the house.',
      characterId: '20',
      position: 1,
    },
    {
      body: 'Please don’t worry, Mother. I promise that I’ll find the secret of Atlantis, and then I’ll be back.',
      characterId: '1',
      position: 2,
    },
    {
      body: 'Aye, me lady, all members of the $lastName family have got to go to sea at one time or another.',
      characterId: '32',
      position: 2,
    },
    {
      body: 'Besides, me thinks there’s trouble brewing between the Captain, I mean the Duke, and some other noble.',
      characterId: '32',
      position: 2,
    },
    {
      body: 'I agree. He’s had several arguments with that noble, Martinez.',
      characterId: '20',
      position: 1,
    },
    {
      body: 'That’s the problem. If it weren’t for Martinez, the Duke could search for the secret of Atlantis himself, and $firstName could stay here.',
      characterId: '32',
      position: 2,
    },
    {
      body: 'And that’s why he wants another Captain to take his place.',
      characterId: '32',
      position: 2,
    },
    {
      body: 'Oh, dear Rocco, you’re a lot brighter than you look. It’s like you’re reading the Duke’s mind!',
      characterId: '20',
      position: 1,
    },
    {
      body: 'That’s because I’ve known the Duke since he was kneehigh to a grasshopper!',
      characterId: '32',
      position: 2,
    },
    {
      body: 'And whether foul or fair cause, I’m all for sending the boy out to learn the ways of the world.',
      characterId: '32',
      position: 2,
    },
    {
      body: 'There’s nothing better than a hardy stint at sea to toughen a lad up.',
      characterId: '32',
      position: 2,
    },
    {
      body: 'If that’s the case, then I trust you’ll look out for $firstName, my only son.',
      characterId: '20',
      position: 1,
    },
    {
      body: '$firstName, I heard from Lucia that there’s not too much money for the voyage.',
      characterId: '20',
      position: 1,
    },
    {
      body: 'This was all so sudden, I couldn’t get everything ready, but please take this.',
      characterId: '20',
      position: 1,
      action: () => {
        // TODO give Aquamarine Tiara
      },
    },
    {
      body: 'This is the aquamarine tiara your father gave to me.',
      characterId: '20',
      position: 1,
    },
    {
      body: 'Sell this for however much you can. But don’t tell your father.',
      characterId: '20',
      position: 1,
    },
    {
      body: 'Now $firstName, my only son, please be very careful! May fair weather be with you on your voyage.',
      characterId: '20',
      position: 1,
      completeQuest: true,
      exitBuilding: true,
    },
  ],
  houseAfterQuestAndPub2: [
    {
      body: 'I’m awfully sorry, but the Duke’s orders were quite specific. You are not to enter the house.',
      characterId: '7',
      position: 1,
    },

    {
      body: 'I know that. I just thought that I’d say good-bye before I got started on my trip.',
      characterId: '1',
      position: 2,
    },
    {
      body: 'Well then, Master $firstName, please be careful. The sea’s a fickle lady. She can change unexpectedly. ',
      characterId: '7',
      position: 1,
      exitBuilding: true,
    },
  ],
  pubBeforeQuest: [
    {
      body: 'Well isn’t this a rare treat, Master $firstName.',
      characterId: '98',
      position: 1,
    },
    {
      body: 'Hey $firstName, how about playing a tune for me on that lute of yours? I feel like singing!',
      characterId: '99',
      position: 1,
    },
    {
      body: 'Lucia! You should be more polite to the son of a noble.',
      characterId: '98',
      position: 1,
    },
    {
      body: 'Oh, don’t worry, Lucia and I have been friends forever!',
      characterId: '1',
      position: 2,
    },
    {
      body: 'By the way, $firstName, Rocco came by here looking for you. He said the Duke was calling for you.',
      characterId: '98',
      position: 1,
    },
    {
      body: 'My father? Well then, I apologize, but I’d better be going.',
      characterId: '1',
      position: 2,
    },
    {
      body: 'Oh, $firstName! You’re leaving already?!',
      characterId: '99',
      position: 1,
      completeQuest: true,
      exitBuilding: true,
    },
  ],
  pubBeforeQuest2: [
    {
      body: 'Master $firstName, I think you’d better be heading home now.',
      characterId: '98',
      position: 1,
      exitBuilding: true,
    },
  ],
  pubAfterQuest: [
    {
      body: 'Master $firstName, what’s going on? The whole town is in an uproar.',
      characterId: '98',
      position: 1,
    },
    {
      body: 'Are you really going to leave on a sea voyage?',
      characterId: '99',
      position: 1,
    },
    {
      body: 'I’m afraid so. It’s the $lastName tradition, after all.',
      characterId: '1',
      position: 2,
    },
    {
      body: 'Except, I’m not sure what we’re going to do about money.',
      characterId: '1',
      position: 2,
    },
    {
      body: 'Why not become a traveling band? I’d be happy to sing for you!',
      characterId: '99',
      position: 1,
    },
    {
      body: 'Come now, Lucia, stop your nonsense.',
      characterId: '98',
      position: 1,
    },
    {
      body: 'Master $firstName, here is 1000 gold pieces. Please, take it.',
      characterId: '98',
      position: 1,
    },
    {
      body: 'Here I thought this pub wasn’t popular at all, but ye’ve managed to save up quite a little bit.',
      characterId: '32',
      position: 1,
    },
    {
      body: 'Thanks. Sorry we’re not up to your standards, Rocco.',
      characterId: '98',
      position: 1,
    },
    {
      body: 'Master $firstName, please, accept this gift.',
      characterId: '98',
      position: 1,
    },
    {
      body: 'No, I’m sorry, but I can’t. I wouldn’t be able to return it to you.',
      characterId: '1',
      position: 2,
    },
    {
      body: 'Don’t worry about that. Actually, I’m not supposed to say this, but this money is really from your father, the Duke.',
      characterId: '98',
      position: 1,
    },
    {
      body: 'He said, ’Please give this to $firstName if he stops by to see you.’',
      characterId: '98',
      position: 1,
    },
    {
      body: 'My father...?',
      characterId: '1',
      position: 2,
      action: () => {
        receiveGold(1000);
      },
    },
    {
      body: 'This is all well and good, but we’ll be needing a little more money if ye wants to get further than Lisbon...',
      characterId: '32',
      position: 1,
    },
    {
      body: 'Shiver me timbers! Why didn’t I think of this earlier? Ye mother will help ye!',
      characterId: '32',
      position: 1,
    },
    {
      body: 'But how? I’m not even allowed inside the house.',
      characterId: '1',
      position: 2,
    },
    {
      body: 'Don’t worry. I’ll take a message for you.',
      characterId: '99',
      position: 2,
    },
    {
      body: 'Lucia!',
      characterId: '1',
      position: 2,
      fadeBeforeNext: true,
    },
    {
      body: 'I’m back.',
      characterId: '99',
      position: 1,
    },
    {
      body: 'So, missie, how’d it go?',
      characterId: '32',
      position: 1,
    },
    {
      body: 'She wants you to come to the house between 10 and 12 at night.',
      characterId: '99',
      position: 1,
    },
    {
      body: 'Thanks for the advice Carlotta. Thank you Lucia.',
      characterId: '1',
      position: 2,
      completeQuest: true,
      exitBuilding: true,
    },
  ],
  pubAfterQuest2: [
    {
      body: 'I heard that your mother wants you to come to the house between 10 and 12 at night.',
      characterId: '99',
      position: 1,
      exitBuilding: true,
    },
  ],
  // Only the Lodge doesn’t trigger an exit
  lodgeBankGuildBeforeQuestRandom1: [
    {
      body: 'Well this is a surprise, Master $firstName. Are you avoiding something?',
      position: 0,
    },
    {
      body: 'You’re part of the $lastName family, so I guess you’ll be taking a trip soon, right?',
      position: 0,
    },
  ],
  lodgeBankGuildBeforeQuestRandom2: [
    {
      body: 'Welcome Master $lastName. You know, your father’s one of my best customers.',
      position: 0,
    },
    {
      body: 'Rocco came here looking for you.',
      position: 0,
    },
  ],
  lodgeBankGuildBeforeQuestRandom3: [
    {
      body: 'Just a little advice, Master $firstName- visit the pub whenever you’ve got a problem.',
      position: 0,
    },
    {
      body: 'The pub owner, Carlotta, helped out your father, the Duke, quite a bit when he was your age.',
      position: 0,
    },
  ],
  lodgeBankGuildAfterQuestRandom1: [
    {
      body: 'Master $firstName, is it true that everyone’s to treat you as a commoner?',
      position: 0,
    },
    {
      body: 'Yes that’s right. So just treat me like a regular sailor, OK?',
      characterId: '1',
      position: 2,
    },
  ],
  lodgeBankGuildAfterQuestRandom2: [
    {
      body: 'Master $firstName, I’m sure you’ll find the secret of Atlantis.',
      position: 0,
    },
  ],
  lodgeBankGuildAfterQuestRandom3: [
    {
      body: 'Say, Master $firstName, you’re leaving pretty soon, aren’t you?',
      position: 0,
    },
  ],
  palaceBeforeQuest: [
    {
      body: 'Welcome Master $firstName. Duke $lastName was here looking for you.',
      position: 0,
      exitBuilding: true,
    },
  ],
  palaceAfterQuest: [
    {
      body: 'Master $firstName, the Duke has ordered everyone to treat you as a commoner. So, I’m afraid I must ask you not to enter the Palace anymore.',
      position: 0,
      exitBuilding: true,
    },
  ],
  itemShopBeforeQuest: [
    {
      body: 'Hello there Master $firstName. Rocco was here earlier looking for you.',
      position: 0,
      exitBuilding: true,
    },
  ],
  itemShopAfterQuest: [
    {
      body: 'Welcome Master $firstName. I have something for you.',
      position: 0,
    },
    {
      body: 'For me?',
      characterId: '1',
      position: 2,
    },
    {
      body: 'Your Butler Marco came by here and asked me to give this rapier to you if you stopped by.',
      position: 0,
    },
    {
      body: 'It’s already been paid for, so please take it.',
      position: 0,
      action: () => {
        // TODO give Rapier
      },
      completeQuest: true,
    },
    {
      body: 'Be careful out there. And remember, a weapon’s useless if you don’t equip yourself with it.',
      position: 0,
    },
  ],
  itemShopAfterQuest2: [
    {
      body: 'Be careful out there. And remember, a weapon’s useless if you don’t equip yourself with it.',
      position: 0,
    },
  ],
  shipyardBeforeQuest: [
    {
      body: 'Say, there’s a ship being built by Duke $lastName’s orders! I wonder who’s going to use it?',
      position: 0,
    },
    {
      body: 'Rocco, probably.',
      characterId: '1',
      position: 2,
    },
    {
      body: 'That reminds me, Rocco was in here looking for you.',
      position: 0,
      exitBuilding: true,
    },
  ],
  shipyardAfterQuest: [
    {
      body: 'Ahoy there, is our ship finished yet?',
      characterId: '32',
      position: 2,
    },
    {
      body: 'Why if it isn’t Rocco! Aye, mate, she’s all finished.',
      position: 0,
    },
    {
      body: 'I built ’er exactly as Duke Leon ordered. A Latin, just like the one he first sailed on.',
      position: 0,
    },
    {
      body: 'Her name’s the Hermes II. She’s got a triangle sail, easy for landlubbers to control.',
      position: 0,
      action: () => {
        // TODO give ship
      },
      completeQuest: true,
      exitBuilding: true,
    },
  ],
  churchBeforeQuest: [
    {
      body: 'Master $firstName, is there anyone in the Duke $lastName’s household that could possibly take a trip?',
      position: 0,
    },
    {
      body: 'I’m afraid not. My father is too busy, and I’ve no experience.',
      characterId: '1',
      position: 2,
    },
    {
      body: 'I’m looking for a reliable man to... Well, never mind.',
      position: 0,
    },
    {
      body: 'Oh, that reminds me, Rocco was here looking for you.',
      position: 0,
    },
    {
      body: 'I see. Well then, I guess I’ll go back to the house.',
      characterId: '1',
      position: 2,
      completeQuest: true,
      exitBuilding: true,
    },
  ],
  churchBeforeQuest2: [
    {
      body: 'Master $firstName, are you going to go to the house now?',
      position: 0,
      exitBuilding: true,
    },
  ],
  churchAfterQuest: [
    {
      body: 'I’m glad you could make it, Master $firstName.',
      position: 0,
    },
    {
      body: 'I heard you had something on your mind. What is it?',
      characterId: '1',
      position: 2,
    },
    {
      body: 'Well, actually, I have something to ask of you.',
      position: 0,
    },
    {
      body: 'Wait a minute. You’re looking for a sailor, right?',
      characterId: '1',
      position: 2,
    },
    {
      body: 'Yes. And I have heard rumors about you, Master $firstName. About your voyage.',
      position: 0,
    },
    {
      body: 'My colleagues and I have long been fascinated by the riddle of the existence of Atlantis. We admire your endeavor.',
      position: 0,
    },
    {
      body: 'And along with that, I have a favor to ask of you, young Master.',
      position: 0,
    },
    {
      body: 'Enrico, Brother Enrico! Over here please.',
      position: 0,
    },
    {
      body: 'Yes sir!',
      characterId: '33',
      position: 2,
    },
    {
      body: 'Brother Enrico is a Franciscan missionary.',
      position: 0,
    },
    {
      body: 'Master $firstName, we’d like to spread the teachings of the Christian faith in the East.',
      position: 0,
    },
    {
      body: 'I know this may be a great deal to ask, but we want you to take him to the land of Zipangu.',
      position: 0,
    },
    {
      body: 'Did you say Zipangu?! I heard from my father that it’s a beautiful island in the far east, that Marco Polo wrote about, but...',
      characterId: '1',
      position: 2,
    },
    {
      body: 'There’s no way I could do that now. I’ve never even left the land of Iberia!',
      characterId: '1',
      position: 2,
    },
    {
      body: 'But I want to exchange knowledge with them, and teach them my faith.',
      characterId: '33',
      position: 2,
    },
    {
      body: 'The Vatican commissioned me to go there as a missionary.',
      characterId: '33',
      position: 2,
    },
    {
      body: 'Please. Take me to Zipangu.',
      characterId: '33',
      position: 2,
    },
    {
      body: 'Well, since you’re willing to go that far, I guess I can’t refuse. But I really can’t say how many years it will take.',
      characterId: '1',
      position: 2,
    },
    {
      body: 'Are ye sure ye want to do this? I mean, a promise like that, well...',
      characterId: '32',
      position: 2,
    },
    {
      body: 'Well, Zipangu is certainly far away, but if we take it day by day, and make progress little by little, we’ll make it.',
      characterId: '1',
      position: 2,
    },
    {
      body: 'Aye, ye’ve got a point there.',
      characterId: '32',
      position: 2,
      completeQuest: true,
      action: () => {
        // TODO add Enrico to party
      },
    },
  ],
  // Accept/Donate/Refuse not implemented
  churchAfterEnrico: [
    {
      body: 'Oh Master $firstName. Thank you so much for agreeing to take Brother Enrico.',
      position: 0,
    },
    {
      body: 'I managed to get together some gold for you. Please use it wisely.',
      position: 0,
    },
    {
      body: 'Thank you very much. I promise to put it to good use.',
      characterId: '1',
      position: 2,
      completeQuest: true,
    },
  ],
  churchAfterEnricoAfterGift: [
    {
      body: 'Oh Master $firstName. Thank you so much for agreeing to take Brother Enrico.',
      position: 0,
    },
  ],
  harborBeforeQuest: [
    {
      body: 'Master $firstName, whenever you have a problem, just go on over to the pub.',
      position: 0,
    },
    {
      body: 'The pub owner, Carlotta, helped out the Duke quite a bit when he was your age.',
      position: 0,
    },
  ],
  harborAfterQuest: [
    {
      body: 'We can’t sail the seas without a ship, now can we? Let’s go to the shipyard.',
      characterId: '32',
      position: 1,
    },
  ],
  harborAfterQuestAfterShip: [
    {
      body: 'Hey Master $firstName, Father Felippe of the church in Lisbon was looking for you.',
      position: 0,
    },
    {
      body: 'Hmm, I wonder what he wants.',
      characterId: '1',
      position: 2,
      exitBuilding: true,
    },
  ],
  harborAfterQuestAfterShipAfterEnrico: [
    {
      body: 'We’ll be food for the whales if we don’t get our hands on a bit o’ gold. Why don’t ye go to the pub and ask Carlotta for help?',
      characterId: '32',
      position: 1,
    },
  ],
  harborAfterQuestAfterShipAfterEnrico2: [
    {
      body: 'We’re running pretty low on gold, mate. Ye should go ask Carlotta at the pub. She helped the Duke out when he was younger.',
      characterId: '32',
      position: 1,
    },
  ],
  harborAfterQuestAfterShipAfterEnricoAfterPub: [
    {
      body: 'Cap’n, don’t ye think we could use a little bit more money?',
      characterId: '32',
      position: 1,
    },
  ],
  harborFinal: [
    {
      body: 'So what’s the plan of action?',
      characterId: '32',
      position: 1,
    },
    {
      body: 'Well, I thought we’d just sail around from port to port.',
      characterId: '1',
      position: 2,
    },
    {
      body: 'Hah! That’s not a very bright plan.',
      characterId: '32',
      position: 1,
    },
    {
      body: 'Why not?',
      characterId: '1',
      position: 2,
    },
    {
      body: 'Gold. It takes a heap o’ gold to keep a ship like this afloat.',
      characterId: '32',
      position: 1,
    },
    {
      body: 'Water’s free, but ye’d be amazed at how much it costs to feed a crew.',
      characterId: '32',
      position: 1,
    },
    {
      body: 'So are you saying that this money won’t be enough?',
      characterId: '1',
      position: 2,
    },
    {
      body: 'Well, it ought to last us about a month. But resting on that fact won’t get us any more!',
      characterId: '32',
      position: 1,
    },
    {
      body: 'But ye’re on the right track. Sailing around from port to port is a good beginning because...',
      characterId: '32',
      position: 1,
    },
    {
      body: 'Ah! You figure we can trade and make a profit along the way, right?',
      characterId: '33',
      position: 1,
    },
    {
      body: 'Ah, now here’s a mate who’s using his noggin!',
      characterId: '32',
      position: 1,
    },
    {
      body: 'But even if we decide to trade, I don’t know what to buy where and where to sell what.',
      characterId: '1',
      position: 2,
    },
    {
      body: 'Well, for example, we should buy goods particular to each port. Like Lisbon’s rock salt.',
      characterId: '33',
      position: 1,
    },
    {
      body: 'Hmmm...',
      characterId: '1',
      position: 2,
    },
    {
      body: 'I’m a missionary, but the subject of economics fascinates me. It’s been a hobby of mine to study the market.',
      characterId: '33',
      position: 1,
    },
    {
      body: 'If we buy rock salt for 40 gold pieces here, we should be able to sell it for at least 60 gold pieces in Seville.',
      characterId: '33',
      position: 1,
    },
    {
      body: 'Captain, Brother Enrico seems to have a head for numbers, so why don’t ye make him the bookkeeper on our ship?',
      characterId: '32',
      position: 1,
    },
    // if yes
    {
      body: 'Not a bad idea. Welcome to the crew, Brother Enrico.',
      characterId: '1',
      position: 2,
    },
    {
      body: 'Oh, and I’d like you to be first mate, Rocco.',
      characterId: '1',
      position: 2,
    },
    {
      body: 'Well, I do have a pretty good idea of prices at the ports I’ve read about.',
      characterId: '33',
      position: 1,
    },
    {
      body: 'If we check our log of goods, I should be able to figure out which port will pay the most for each item.',
      characterId: '33',
      position: 1,
    },
    // if no
    {
      body: 'No, it’s not right to ask Brother Enrico to do such work.',
      characterId: '1',
      position: 2,
    },
    {
      body: 'Well, actually, I wouldn’t mind it in the least. I’d be glad to help!',
      characterId: '33',
      position: 1,
    },
    {
      body: 'Well then, perhaps I’ll ask you again when we start to trade.',
      characterId: '1',
      position: 2,
    },
  ],
  marketBeforeQuest: [
    {
      body: 'Welcome Master $lastName. It’s always a pleasure to see the son of my favorite customer, the Duke.',
      position: 0,
    },
    {
      body: 'Rocco was just here looking for you.',
      position: 0,
    },
    {
      body: 'By the way, you can sell our rock salt for a pretty profit in the Mediterranean.',
      position: 0,
    },
    {
      body: 'Furthermore, a trade route between here and Seville, with their porcelain, turns a nice profit as well.',
      position: 0,
      exitBuilding: true,
    },
  ],
  marketAfterQuestBeforeShip: [
    {
      body: 'Master $firstName, my apologies, but you don’t have a ship yet to store any goods.',
      position: 0,
    },
    {
      body: 'Come back once you’ve gotten your ship. Thank you, I’m looking forward to doing business with you soon!',
      position: 0,
      exitBuilding: true,
    },
  ],
});

export type QuestId = keyof typeof questData;

export default questData;
