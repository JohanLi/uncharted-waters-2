import { asInferredKeysWithValue } from '../utils';

// 5 and 6 are not used at all. 13 and above are not implemented
export const itemCategories = {
  '1': 'Straight Sword',
  '2': 'Fencing Sword',
  '3': 'Curved Sword',
  '4': 'Heavy Sword',
  '7': 'Armor',
  '8': 'Measuring Instrument',
  '9': 'Voyager’s Aid',
  '10': 'Emergency Item',
  '11': 'Accessory',
  '12': 'Treasure',
};

type CategoryId = keyof typeof itemCategories;

export type Item = {
  name: string;
  description: string;
  price: number;
  imageSlice: number;
  rating: number;
  categoryId: CategoryId;
};

export const itemData = asInferredKeysWithValue<Item>()({
  '1': {
    name: 'Dagger',
    description:
      'A short sheathed knife used for protection, wielding an 8 inch blade.',
    price: 500,
    imageSlice: 0,
    rating: 5,
    categoryId: '1',
  },
  '2': {
    name: 'Short Sword',
    description:
      'A short sword with a 32 inch blade. Light and versatile, it’s often used in close fighting.',
    price: 1000,
    imageSlice: 1,
    rating: 10,
    categoryId: '1',
  },
  '3': {
    name: 'Long Sword',
    description:
      'A long sword measuring about 40 inches in length. It was very popular among medieval knights.',
    price: 4000,
    imageSlice: 2,
    rating: 20,
    categoryId: '1',
  },
  '4': {
    name: 'Rapier',
    description:
      'A light, slender, two-edged sword used only for thrusting. It came into use after guns made armor obsolete.',
    price: 3000,
    imageSlice: 3,
    rating: 15,
    categoryId: '2',
  },
  '5': {
    name: 'Epee',
    description:
      'A light sword with a sharp-pointed blade but no cutting edge, used only for thrusting in dueling. It’s not very effective when it comes to attacking.',
    price: 2000,
    imageSlice: 3,
    rating: 10,
    categoryId: '2',
  },
  '6': {
    name: 'Estock',
    description:
      'A sword developed to pierce the armor of a mounted enemy. It has a higher attacking rating than a Rapier.',
    price: 6000,
    imageSlice: 3,
    rating: 20,
    categoryId: '2',
  },
  '7': {
    name: 'Short Saber',
    description:
      'A light, slender sword used by cavalry. It’s less effective in an attack than a Saber, but its low price makes it popular.',
    price: 3000,
    imageSlice: 5,
    rating: 10,
    categoryId: '3',
  },
  '8': {
    name: 'Scimitar',
    description:
      'A curved saber with an outer cutting edge. A great weapon for attacking, it’s used mainly by Arabs and Persians.',
    price: 8000,
    imageSlice: 6,
    rating: 20,
    categoryId: '3',
  },
  '9': {
    name: 'Japanese Sword',
    description:
      'A very sharp sword made in Japan. It’s especially effective for lashing attacks.',
    price: 20000,
    imageSlice: 7,
    rating: 25,
    categoryId: '3',
  },
  '10': {
    name: 'Cutlass',
    description:
      'A heavy, curved short sword that historically has been used by sailors.',
    price: 1500,
    imageSlice: 8,
    rating: 10,
    categoryId: '4',
  },
  '11': {
    name: 'Broad Sword',
    description:
      'A sword with a wide, straight, single-edged blade. It’s especially effective for striking.',
    price: 5000,
    imageSlice: 9,
    rating: 20,
    categoryId: '4',
  },
  '12': {
    name: 'Blue Crescent',
    description:
      'A unique Chinese sword with a wide, crescent-shaped blade. It’s quite good for attacking, especially striking.',
    price: 24000,
    imageSlice: 10,
    rating: 30,
    categoryId: '4',
  },
  '13': {
    name: 'Flamberge',
    description:
      'A long decorative sword with wavy edges. Its offensive capability is superior to both the Rapier and the Estock.',
    price: 14000,
    imageSlice: 4,
    rating: 25,
    categoryId: '2',
  },
  '14': {
    name: 'Basterd Sword',
    description:
      'A sword with a grip about 7 inches long. Wielded with one or two hands, it’s one of the most destructive and expensive swords around.',
    price: 14000,
    imageSlice: 2,
    rating: 25,
    categoryId: '1',
  },
  '15': {
    name: 'Claymore',
    description:
      'A large, two-handed sword from Scotland that may weigh up to 10 pounds. It’s quite effective for striking.',
    price: 15000,
    imageSlice: 9,
    rating: 25,
    categoryId: '4',
  },
  '16': {
    name: 'Saber',
    description:
      'A curved single-edged cavalry sword that is more effective for lashing than for thrusting.',
    price: 3000,
    imageSlice: 5,
    rating: 15,
    categoryId: '3',
  },
  '17': {
    name: 'Leather Armor',
    description:
      'A relatively inexpensive armor made of leather that has been hardened with animal grease. ',
    price: 1000,
    imageSlice: 11,
    rating: 10,
    categoryId: '7',
  },
  '18': {
    name: 'Chain Mail',
    description:
      'An armor made of thousands of tiny interlinked steel rings. While it allows the wearer ease of movement, it doesn’t offer the best protection.',
    price: 2000,
    imageSlice: 12,
    rating: 20,
    categoryId: '7',
  },
  '19': {
    name: 'Half Plate',
    description:
      'An armor with sheets of tough, thin steel plates that cover only the upper body. An improvement on Plate Armor, it’s designed for more active naval combats.',
    price: 4000,
    imageSlice: 13,
    rating: 30,
    categoryId: '7',
  },
  '20': {
    name: 'Plate Mail',
    description:
      'A step up from Chain Mail Armor, this armor is formed by a combination of plate and mail. It offers better protection than Half Plate Armor.',
    price: 8000,
    imageSlice: 14,
    rating: 40,
    categoryId: '7',
  },
  '21': {
    name: 'Quadrant',
    description:
      'A low precision instrument used for celestial navigation. It measures longitude and latitude.',
    price: 4000,
    imageSlice: 15,
    rating: 5,
    categoryId: '8',
  },
  '22': {
    name: 'Sextant',
    description:
      'A high precision instrument used for celestial navigation. It measures longitude and latitude.',
    price: 8000,
    imageSlice: 16,
    rating: 2,
    categoryId: '8',
  },
  '23': {
    name: 'Theodolite',
    description:
      'The most precise and reliable instrument used for celestial navigation. It measures longitude and latitude.',
    price: 12000,
    imageSlice: 17,
    rating: 1,
    categoryId: '8',
  },
  '24': {
    name: 'Pocket Watch',
    description:
      'A handy portable watch. With it, you’ll always know the correct time!',
    price: 2000,
    imageSlice: 18,
    rating: 1,
    categoryId: '9',
  },
  '25': {
    name: 'Telescope',
    description:
      'An optical instrument that will help you find distant objects and ports at sea.',
    price: 5000,
    imageSlice: 19,
    rating: 1,
    categoryId: '9',
  },
  '26': {
    name: 'Cat',
    description:
      'Not only does a cat make a nice pet, but it’ll keep your ship rat-free!',
    price: 2000,
    imageSlice: 20,
    rating: 1,
    categoryId: '9',
  },
  '27': {
    name: 'Golden Dragon',
    description:
      'A unique Chinese sword with a wide blade. It’s quite effective for striking.',
    price: 18000,
    imageSlice: 10,
    rating: 25,
    categoryId: '4',
  },
  '28': {
    name: 'Telescope',
    description: 'Reserve',
    price: 5000,
    imageSlice: 19,
    rating: 0,
    categoryId: '9',
  },
  '30': {
    name: 'Marque (P)',
    description:
      'Letter of marque issued by Portugal. It authorizes the bearer to commit acts of piracy against other countries, in the name of Portugal.',
    price: 0,
    imageSlice: 24,
    rating: 0,
    categoryId: '9',
  },
  '31': {
    name: 'Marque (S)',
    description:
      'Letter of marque issued by Spain. It authorizes the bearer to commit acts of piracy against other countries, for the glory of Spain.',
    price: 0,
    imageSlice: 24,
    rating: 0,
    categoryId: '9',
  },
  '32': {
    name: 'Marque (O)',
    description:
      'Letter of marque issued by the Ottoman Empire. It authorizes the bearer to commit acts of piracy against other countries in the name of the Ottoman Empire.',
    price: 0,
    imageSlice: 24,
    rating: 0,
    categoryId: '9',
  },
  '33': {
    name: 'Marque (E)',
    description:
      'Letter of marque issued by England. It authorizes the bearer to commit acts of piracy against other countries, for the glory of England.',
    price: 0,
    imageSlice: 24,
    rating: 0,
    categoryId: '9',
  },
  '34': {
    name: 'Marque (I)',
    description:
      'Letter of marque issued by the Governor General of Italy. It authorizes the bearer to commit acts of piracy against other countries in the name of Italy.',
    price: 0,
    imageSlice: 24,
    rating: 0,
    categoryId: '9',
  },
  '35': {
    name: 'Marque (H)',
    description:
      'Letter of marque issued by Holland. It authorizes the bearer to commit acts of piracy against other countries in the name of Holland.',
    price: 0,
    imageSlice: 24,
    rating: 0,
    categoryId: '9',
  },
  '36': {
    name: 'Tax Permit (P)',
    description:
      'A permit issued by Portugal. It gives one tax-exempt status when trading in ports allied with Portugal.',
    price: 10000,
    imageSlice: 25,
    rating: 0,
    categoryId: '9',
  },
  '37': {
    name: 'Tax Permit (S)',
    description:
      'A permit issued by Spain. It gives one tax-exempt status when trading in ports allied with Spain.',
    price: 10000,
    imageSlice: 25,
    rating: 0,
    categoryId: '9',
  },
  '38': {
    name: 'Tax Permit (O)',
    description:
      'A permit issued by the Ottoman Empire. It gives one tax-exempt status when trading in ports allied with Turkey.',
    price: 10000,
    imageSlice: 25,
    rating: 0,
    categoryId: '9',
  },
  '39': {
    name: 'Tax Permit (E)',
    description:
      'A permit issued by England. It gives one tax-exempt status when trading in ports allied with England.',
    price: 10000,
    imageSlice: 25,
    rating: 0,
    categoryId: '9',
  },
  '40': {
    name: 'Tax Permit (I)',
    description:
      'A permit issued by the Governor-General of Italy. It gives one tax-exempt status when trading in ports allied with Italy.',
    price: 10000,
    imageSlice: 25,
    rating: 0,
    categoryId: '9',
  },
  '41': {
    name: 'Tax Permit (H)',
    description:
      'A permit issued by Holland. It gives one tax-exempt status when trading in ports allied with Holland.',
    price: 10000,
    imageSlice: 25,
    rating: 0,
    categoryId: '9',
  },
  '42': {
    name: 'Rat Poison',
    description:
      'A poison to get rid of rats on a ship. Those pesky animals will feast on your precious food if you don’t have a way to get rid of them.',
    price: 500,
    imageSlice: 21,
    rating: 1,
    categoryId: '10',
  },
  '43': {
    name: 'Balm',
    description: 'A perfumed oil believed to calm storms.',
    price: 1000,
    imageSlice: 22,
    rating: 1,
    categoryId: '10',
  },
  '44': {
    name: 'Lime Juice',
    description:
      'A great remedy for scurvy, the disease of poor nutrition that often troubles a crew during long voyages.',
    price: 1000,
    imageSlice: 23,
    rating: 1,
    categoryId: '10',
  },
  '45': {
    name: 'Royal Crown',
    description:
      'One of the lost treasures of Atlantis. The crown is made of gold and adorned with many precious stones. Quite simply, a priceless work of art.',
    price: 300000,
    imageSlice: 30,
    rating: 1,
    categoryId: '11',
  },
  '51': {
    name: 'Silk Shawl',
    description: 'A soft shawl made of the best silk from China.',
    price: 3000,
    imageSlice: 32,
    rating: 3,
    categoryId: '11',
  },
  '52': {
    name: 'China Dress',
    description:
      'A beautiful traditional Chinese dress, made of the finest Chinese silk.',
    price: 8000,
    imageSlice: 33,
    rating: 8,
    categoryId: '11',
  },
  '53': {
    name: 'Aqua Tiara',
    description:
      'An intricately decorated tiara, set with small but brilliant aquamarine stones.',
    price: 5000,
    imageSlice: 38,
    rating: 5,
    categoryId: '11',
  },
  '54': {
    name: 'Platinum Comb',
    description: 'A fancy comb made of platinum and decorated with rare gems.',
    price: 10000,
    imageSlice: 34,
    rating: 10,
    categoryId: '11',
  },
  '55': {
    name: 'Ermine Coat',
    description:
      'A luxurious fur coat made from the white winter fur of the rare ermine weasel. ',
    price: 12000,
    imageSlice: 27,
    rating: 12,
    categoryId: '11',
  },
  '56': {
    name: 'Circlet',
    description:
      'A beautiful tiara highlighted by a large sapphire in its center.',
    price: 4000,
    imageSlice: 35,
    rating: 4,
    categoryId: '11',
  },
  '57': {
    name: 'Peacock Fan',
    description:
      'A beautiful fan made of many long and colorful peacock feathers.',
    price: 3000,
    imageSlice: 36,
    rating: 3,
    categoryId: '11',
  },
  '58': {
    name: 'Silk Scarf',
    description: 'A colorful scarf made of fine silk.',
    price: 1000,
    imageSlice: 37,
    rating: 2,
    categoryId: '11',
  },
  '59': {
    name: 'Velvet Coat',
    description: 'A velvet coat cut in the latest 16th century fashion.',
    price: 5000,
    imageSlice: 27,
    rating: 5,
    categoryId: '11',
  },
  '60': {
    name: 'Diamond Crown',
    description:
      'A crown originally made for a queen, set with extremely large diamonds.',
    price: 100000,
    imageSlice: 30,
    rating: 100,
    categoryId: '12',
  },
  '61': {
    name: 'Mermaid Bangle',
    description: 'A dazzling gold bracelet decorated with beautiful opals. ',
    price: 10000,
    imageSlice: 28,
    rating: 10,
    categoryId: '12',
  },
  '62': {
    name: 'Ruby Scepter',
    description: 'A scepter with a huge ruby the size of an egg at the top.',
    price: 50000,
    imageSlice: 39,
    rating: 50,
    categoryId: '12',
  },
  '63': {
    name: 'Candleholder',
    description: 'An antique candleholder made of brass.',
    price: 3000,
    imageSlice: 40,
    rating: 3,
    categoryId: '12',
  },
  '64': {
    name: 'Jade Jewelbox',
    description: 'A tiny box carved out of jade.',
    price: 20000,
    imageSlice: 31,
    rating: 20,
    categoryId: '12',
  },
  '65': {
    name: 'Crown of Glory',
    description: 'A gold crown with delicate decorations.',
    price: 50000,
    imageSlice: 30,
    rating: 60,
    categoryId: '12',
  },
  '66': {
    name: 'Gold Bracelet',
    description: 'A wide, heavy, solid gold bracelet set with diamonds.',
    price: 15000,
    imageSlice: 28,
    rating: 15,
    categoryId: '12',
  },
  '67': {
    name: 'Sapphire Ring',
    description: 'A beautiful ring, set with a large sapphire.',
    price: 18000,
    imageSlice: 29,
    rating: 20,
    categoryId: '12',
  },
  '68': {
    name: 'Malachite Box',
    description: 'A small box cut of malachite stone.',
    price: 8000,
    imageSlice: 31,
    rating: 10,
    categoryId: '12',
  },
  '69': {
    name: 'Garnet Brooch',
    description: 'A beautifully designed brooch set with beautiful garnets.',
    price: 20000,
    imageSlice: 41,
    rating: 20,
    categoryId: '12',
  },
  '70': {
    name: 'Ruby Ring',
    description: 'A ring set with a large ruby.',
    price: 22000,
    imageSlice: 29,
    rating: 25,
    categoryId: '12',
  },
  '74': {
    name: 'Magic Muramasa',
    description:
      'A treasured sword made in the 15th century by a famous Japanese swordsmith, Muramasa.',
    price: 380000,
    imageSlice: 7,
    rating: 40,
    categoryId: '3',
  },
  '75': {
    name: 'Rune Blade',
    description:
      'A sword with runes carved on the handle. Its destructive power is second to none.',
    price: 360000,
    imageSlice: 2,
    rating: 40,
    categoryId: '1',
  },
  '76': {
    name: 'Crusader Armor',
    description:
      'Armor that the famous armorer, Montaguinus made-to-order for Affonso, the founding king of Portugal.',
    price: 600000,
    imageSlice: 14,
    rating: 70,
    categoryId: '7',
  },
  '77': {
    name: 'Crusader Sword',
    description:
      'A special sword with razor-like sharpness made by the renowned swordsmith, Michelangelo.',
    price: 380000,
    imageSlice: 4,
    rating: 40,
    categoryId: '2',
  },
  '78': {
    name: 'Siva’s Sword',
    description:
      'A legendary sword that’s believed to confine the power of Siva, the Hindu god of destruction. A powerful lashing weapon.',
    price: 280000,
    imageSlice: 6,
    rating: 30,
    categoryId: '3',
  },
  '79': {
    name: 'Errol’s Plate',
    description:
      'Half plate armor made by the famous Copenhagen armorer, Errol. It provides greater protection than plate mail armor.',
    price: 300000,
    imageSlice: 13,
    rating: 55,
    categoryId: '7',
  },
});

export type ItemId = keyof typeof itemData;

export const getAttackOrDefenseDisplay = (
  rating: number,
  categoryId: CategoryId,
) => {
  const isWeapon = ['1', '2', '3', '4'].includes(categoryId);

  if (isWeapon) {
    let letter = 'D';

    if (rating > 40) {
      letter = '*';
    }

    if (rating > 30) {
      letter = 'A';
    }

    if (rating > 20) {
      letter = 'B';
    }

    if (rating > 10) {
      letter = 'C';
    }

    return {
      label: 'Attack',
      letter,
    };
  }

  const isArmor = categoryId === '7';

  if (isArmor) {
    let letter = 'D';

    if (rating > 40) {
      letter = '*';
    }

    if (rating > 30) {
      letter = 'A';
    }

    if (rating > 20) {
      letter = 'B';
    }

    if (rating > 10) {
      letter = 'C';
    }

    return {
      label: 'Defense',
      letter,
    };
  }

  return null;
};
