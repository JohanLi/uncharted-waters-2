interface PortsToShipyards {
  [key: string]: number;
}

export const portsToShipyards: PortsToShipyards = {
  '1': 1,
  '2': 1,
  '3': 6,
  '4': 1,
  '5': 6,
  '6': 6,
  '7': 1,
  '8': 4,
  '9': 5,
  '10': 5,
  '11': 5,
  '12': 5,
  '13': 1,
  '14': 5,
  '15': 5,
  '16': 5,
  '17': 5,
  '18': 5,
  '19': 6,
  '20': 6,
  '21': 6,
  '22': 6,
  '23': 6,
  '24': 6,
  '25': 6,
  '26': 6,
  '27': 1,
  '28': 4,
  '29': 4,
  '30': 2,
  '31': 2,
  '32': 2,
  '33': 3,
  '34': 3,
  '35': 4,
  '36': 3,
  '37': 4,
  '38': 4,
  '39': 4,
  '40': 4,
  '41': 4,
  '42': 4,
  '43': 11,
  '44': 11,
  '45': 11,
  '46': 11,
  '47': 11,
  '48': 11,
  '49': 11,
  '50': 11,
  '51': 11,
  '52': 11,
  '53': 11,
  '54': 11,
  '55': 11,
  '56': 11,
  '57': 11,
  '58': 8,
  '59': 8,
  '60': 8,
  '61': 8,
  '62': 8,
  '63': 8,
  '64': 8,
  '65': 8,
  '66': 8,
  '67': 8,
  '68': 8,
  '69': 8,
  '70': 8,
  '71': 8,
  '72': 8,
  '73': 7,
  '74': 7,
  '75': 7,
  '76': 6,
  '77': 7,
  '78': 7,
  '79': 7,
  '80': 7,
  '81': 7,
  '82': 7,
  '83': 7,
  '84': 7,
  '85': 7,
  '86': 7,
  '87': 7,
  '88': 7,
  '89': 7,
  '90': 7,
  '91': 7,
  '92': 7,
  '93': 7,
  '94': 7,
  '95': 9,
  '96': 9,
  '97': 7,
  '98': 9,
  '99': 10,
  '100': 10,
};

interface ShipyardToShips {
  shipId: string;
  industryRequirement: number;
}

export const shipyardsToShips: {
  [key: string]: ShipyardToShips[];
} = {
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
