import pathlib

pathlib.Path('./output').mkdir(parents=True, exist_ok=True)

combined_tilemaps = b''

for i in range(101):
    with open('./raw/tilemaps/PORTMAP.' + f'{i:03}', 'rb') as file:
        combined_tilemaps += file.read()

with open('./output/port-tilemaps.bin', 'wb') as file:
    file.write(combined_tilemaps)
