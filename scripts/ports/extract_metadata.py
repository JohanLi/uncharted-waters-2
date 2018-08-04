import json
import pathlib

pathlib.Path('./output').mkdir(parents=True, exist_ok=True)


def shift_world_map(x):
    if x >= 1440:
        return x - 1440

    return x + 720


def building_type_exists(x, y):
    if x == 255 and y == 255:
        return False

    if x == 0 and y == 0:
        return False

    return True


ports = {}

with open('./raw/DATA1.015', 'rb') as file:
    raw_bytes = file.read()

byte_cursor = 20286

for i in range(1, 131):
    x = (raw_bytes[byte_cursor + 3] << 8) | raw_bytes[byte_cursor + 2]
    y = (raw_bytes[byte_cursor + 5] << 8) | raw_bytes[byte_cursor + 4]
    name = raw_bytes[byte_cursor + 6:byte_cursor + 20].decode('utf-8').strip('\u0000')

    x = shift_world_map(x)

    ports[i] = {}
    ports[i]['name'] = name
    ports[i]['x'] = x
    ports[i]['y'] = y

    byte_cursor += 20

byte_cursor = 22886

for i in range(1, 101):
    ports[i]['economy'] = (raw_bytes[byte_cursor + 3] << 8) | raw_bytes[byte_cursor + 2]
    ports[i]['industry'] = (raw_bytes[byte_cursor + 7] << 8) | raw_bytes[byte_cursor + 6]
    ports[i]['allegiances'] = [int(x) for x in raw_bytes[byte_cursor + 10:byte_cursor + 16]]
    ports[i]['regionId'] = raw_bytes[byte_cursor + 30]

    item_shop = {
        'regular': [int(x) for x in raw_bytes[byte_cursor + 31:byte_cursor + 34]],
        'secret': [raw_bytes[byte_cursor + 34]],
    }

    item_shop['regular'] = [x for x in item_shop['regular'] if x != 255]

    if item_shop['secret'][0] == 255:
        del item_shop['secret']

    if len(item_shop['regular']):
        ports[i]['itemShop'] = item_shop

    ports[i]['economyId'] = raw_bytes[byte_cursor + 35]
    ports[i]['industryId'] = raw_bytes[byte_cursor + 36]

    byte_cursor += 37

with open('./raw/ZA_DAT.DAT', 'rb') as file:
    raw_bytes = file.read()

byte_cursor = 0

for i in range(1, 102):
    buildings = {}

    for j in range(1, 13):
        x = raw_bytes[byte_cursor]
        y = raw_bytes[byte_cursor + 1]

        byte_cursor += 2

        if building_type_exists(x, y):
            buildings[j] = {
                'x': x,
                'y': y,
            }

    ports[i]['buildings'] = buildings

with open('./raw/CHIP_NO.DAT', 'rb') as file:
    raw_bytes = file.read()

for i in range(1, 101):
    ports[i]['tileset'] = raw_bytes[i - 1]

ports['tilesetCollisionIndices'] = {}

for i in range(7):
    with open('./raw/tilesets/PORTCHIP.' + f'{(i * 2) + 1:03}', 'rb') as file:
        raw_bytes = file.read()

    ports['tilesetCollisionIndices'][i] = {
        'leftmost': raw_bytes[1],
        'rightmost': raw_bytes[2],
        'full': raw_bytes[3],
    }

ports['characters'] = [
    {
        "frame": 4,
        "spawn": {
            "building": 4,
            "offset": {
                "x": 0,
                "y": 32
            }
        }
    },
    {
        "frame": 12,
        "spawn": {
            "building": 1,
            "offset": {
                "x": -64,
                "y": 32
            }
        }
    },
    {
        "frame": 12,
        "spawn": {
            "building": 3,
            "offset": {
                "x": 0,
                "y": 0
            }
        }
    },
    {
        "frame": 20,
        "spawn": {
            "building": 2,
            "offset": {
                "x": -64,
                "y": 32
            }
        }
    },
    {
        "frame": 20,
        "spawn": {
            "building": 5,
            "offset": {
                "x": -64,
                "y": 32
            }
        }
    },
    {
        "frame": 24,
        "spawn": {
            "building": 1,
            "offset": {
                "x": 64,
                "y": 32
            }
        },
        "isImmobile": True
    },
    {
        "frame": 26,
        "spawn": {
            "building": 5,
            "offset": {
                "x": 64,
                "y": 32
            }
        },
        "isImmobile": True
    },
    {
        "frame": 28,
        "spawn": {
            "building": 2,
            "offset": {
                "x": 64,
                "y": 32
            }
        },
        "isImmobile": True
    }
]

ports['regions'] = [
    'Europe',
    'New World',
    'West Africa',
    'East Africa',
    'Middle East',
    'India',
    'Southeast Asia',
    'Far East',
]

ports['markets'] = [
    'Iberia',
    'Northern Europe',
    'The Mediterranean',
    'North Africa',
    'Ottoman Empire',
    'West Africa',
    'Central America',
    'South America',
    'East Africa',
    'Middle East',
    'India',
    'Southeast Asia',
    'Far East',
]

with open('./output/ports.json', 'w') as file:
    json.dump(ports, file, indent=2)
