// Characters are only used during dialog

export type Character = {
  name: string;
  color: string;
};

const characterData: { [key: string]: Character } = {
  '1': {
    name: 'João',
    color: 'text-blue-600',
  },
  '7': {
    name: 'Butler Marco',
    color: 'text-blue-900',
  },
  '19': {
    name: 'Duke Franco',
    color: 'text-red-600',
  },
  '20': {
    name: 'Duchess Christiana',
    color: 'text-yellow-600',
  },
  '32': {
    name: 'Old Sea Hand Rocco',
    color: 'text-amber-800',
  },
  '33': {
    name: 'Brother Enrico',
    color: 'text-purple-800',
  },
  '98': {
    name: 'Carlotta, Owner of the Pub',
    color: 'text-amber-600',
  },
  '99': {
    name: 'Lucia the Waitress',
    color: 'text-pink-600',
  },
};

export default characterData;
