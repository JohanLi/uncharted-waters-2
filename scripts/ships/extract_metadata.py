import json
import pathlib

pathlib.Path('./output').mkdir(parents=True, exist_ok=True)

with open('./raw/DATA1.015', 'rb') as file:
    raw_bytes = file.read()

byte_cursor = 19388

ships = {}

for i in range(25):
    ships[i] = {}
    ships[i]['name'] = raw_bytes[byte_cursor + 0:byte_cursor + 16].decode('utf-8').strip('\u0000')
    ships[i]['id'] = raw_bytes[byte_cursor + 17]
    ships[i]['usedGuns'] = raw_bytes[byte_cursor + 19]
    ships[i]['usedCrew'] = (raw_bytes[byte_cursor + 21] << 8) | raw_bytes[byte_cursor + 20]

    byte_cursor += 24

byte_cursor = 19988

for i in range(25):
    ships[i]['industryRequirement'] = raw_bytes[byte_cursor + 0] * 10
    ships[i]['durability'] = raw_bytes[byte_cursor + 1]
    ships[i]['tacking'] = raw_bytes[byte_cursor + 2]
    ships[i]['power'] = raw_bytes[byte_cursor + 3]
    ships[i]['maximumCrew'] = raw_bytes[byte_cursor + 4] * 10
    ships[i]['minimumCrew'] = raw_bytes[byte_cursor + 5]
    ships[i]['capacity'] = (raw_bytes[byte_cursor + 7] << 8) | raw_bytes[byte_cursor + 6]
    ships[i]['maximumGuns'] = raw_bytes[byte_cursor + 8]
    ships[i]['sailType'] = raw_bytes[byte_cursor + 9]
    ships[i]['basePrice'] = ((raw_bytes[byte_cursor + 11] << 8) | raw_bytes[byte_cursor + 10]) * 10

    byte_cursor += 12


with open('./output/ships.json', 'w') as file:
    json.dump(ships, file, indent=2)
