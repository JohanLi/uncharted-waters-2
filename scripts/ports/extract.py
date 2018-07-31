import json
import pathlib

pathlib.Path('./output').mkdir(parents=True, exist_ok=True)


def shift_world_map(x):
    if x >= 1440:
        return x - 1440

    return x + 720


def metadata_to_json():
    ports = []

    with open('./raw/DATA1.015', 'rb') as file:
        raw_bytes = file.read()

    byte_cursor = 20286

    for i in range(130):
        x = (raw_bytes[byte_cursor + 3] << 8) | raw_bytes[byte_cursor + 2]
        y = (raw_bytes[byte_cursor + 5] << 8) | raw_bytes[byte_cursor + 4]
        name = raw_bytes[byte_cursor + 6:byte_cursor + 20].decode('utf-8').strip('\u0000')

        x = shift_world_map(x)

        ports.append({
            'id': i,
            'name': name,
            'x': x,
            'y': y,
        })

        byte_cursor += 20

    with open('./output/ports.json', 'w') as file:
        json.dump(ports, file, indent=2)


def combine_tilemaps():
    combined_tilemaps = b''

    for i in range(101):
        with open('./raw/PORTMAP.' + f'{i:03}', 'rb') as file:
            combined_tilemaps += file.read()

    with open('./output/port-tilemaps.bin', 'wb') as file:
        file.write(combined_tilemaps)


metadata_to_json()
combine_tilemaps()
