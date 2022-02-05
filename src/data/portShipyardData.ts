export const shipyardsToShips = {
  '1': [
    {
      shipId: '1',
      industryRequirement: 100,
    },
    {
      shipId: '19',
      industryRequirement: 100,
    },
    {
      shipId: '6',
      industryRequirement: 200,
    },
    {
      shipId: '8',
      industryRequirement: 400,
    },
    {
      shipId: '20',
      industryRequirement: 400,
    },
    {
      shipId: '9',
      industryRequirement: 500,
    },
    {
      shipId: '10',
      industryRequirement: 600,
    },
    {
      shipId: '11',
      industryRequirement: 800,
    },
  ],
  '2': [
    {
      shipId: '7',
      industryRequirement: 200,
    },
    {
      shipId: '9',
      industryRequirement: 500,
    },
    {
      shipId: '10',
      industryRequirement: 600,
    },
    {
      shipId: '11',
      industryRequirement: 800,
    },
    {
      shipId: '14',
      industryRequirement: 850,
    },
    {
      shipId: '15',
      industryRequirement: 1000,
    },
    {
      shipId: '16',
      industryRequirement: 1000,
    },
  ],
  '3': [
    {
      shipId: '2',
      industryRequirement: 100,
    },
    {
      shipId: '6',
      industryRequirement: 200,
    },
    {
      shipId: '9',
      industryRequirement: 500,
    },
    {
      shipId: '10',
      industryRequirement: 600,
    },
    {
      shipId: '11',
      industryRequirement: 800,
    },
    {
      shipId: '15',
      industryRequirement: 1000,
    },
    {
      shipId: '17',
      industryRequirement: 1000,
    },
  ],
  '4': [
    {
      shipId: '2',
      industryRequirement: 100,
    },
    {
      shipId: '19',
      industryRequirement: 100,
    },
    {
      shipId: '7',
      industryRequirement: 200,
    },
    {
      shipId: '20',
      industryRequirement: 400,
    },
    {
      shipId: '9',
      industryRequirement: 500,
    },
    {
      shipId: '13',
      industryRequirement: 550,
    },
    {
      shipId: '22',
      industryRequirement: 600,
    },
  ],
  '5': [
    {
      shipId: '19',
      industryRequirement: 100,
    },
    {
      shipId: '5',
      industryRequirement: 200,
    },
    {
      shipId: '6',
      industryRequirement: 200,
    },
    {
      shipId: '4',
      industryRequirement: 700,
    },
    {
      shipId: '20',
      industryRequirement: 400,
    },
    {
      shipId: '9',
      industryRequirement: 500,
    },
    {
      shipId: '21',
      industryRequirement: 500,
    },
    {
      shipId: '10',
      industryRequirement: 600,
    },
  ],
  '6': [
    {
      shipId: '19',
      industryRequirement: 100,
    },
    {
      shipId: '6',
      industryRequirement: 200,
    },
    {
      shipId: '20',
      industryRequirement: 400,
    },
    {
      shipId: '9',
      industryRequirement: 500,
    },
    {
      shipId: '12',
      industryRequirement: 500,
    },
    {
      shipId: '21',
      industryRequirement: 500,
    },
    {
      shipId: '10',
      industryRequirement: 600,
    },
  ],
  '7': [
    {
      shipId: '19',
      industryRequirement: 100,
    },
    {
      shipId: '3',
      industryRequirement: 300,
    },
    {
      shipId: '12',
      industryRequirement: 500,
    },
  ],
  '8': [
    {
      shipId: '19',
      industryRequirement: 100,
    },
    {
      shipId: '7',
      industryRequirement: 200,
    },
    {
      shipId: '9',
      industryRequirement: 500,
    },
    {
      shipId: '10',
      industryRequirement: 600,
    },
  ],
  '9': [
    {
      shipId: '18',
      industryRequirement: 300,
    },
  ],
  '10': [
    {
      shipId: '25',
      industryRequirement: 200,
    },
    {
      shipId: '24',
      industryRequirement: 400,
    },
    {
      shipId: '23',
      industryRequirement: 1000,
    },
  ],
  '11': [
    {
      shipId: '8',
      industryRequirement: 400,
    },
    {
      shipId: '13',
      industryRequirement: 550,
    },
    {
      shipId: '9',
      industryRequirement: 500,
    },
    {
      shipId: '10',
      industryRequirement: 600,
    },
    {
      shipId: '11',
      industryRequirement: 800,
    },
  ],
};

export type IndustryId = keyof typeof shipyardsToShips;
