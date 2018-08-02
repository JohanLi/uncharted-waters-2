import pathlib

pathlib.Path('./output').mkdir(parents=True, exist_ok=True)

europe_africa = []
asia = []
americas = []

with open('./output/world-map0.bin', 'rb') as file:
    for _ in range(1080):
        europe_africa.append(file.read(720))

with open('./output/world-map1.bin', 'rb') as file:
    for _ in range(1080):
        asia.append(file.read(720))

with open('./output/world-map2.bin', 'rb') as file:
    for _ in range(1080):
        americas.append(file.read(720))

combined_world_map = b''

for i in range(1080):
    combined_world_map += americas[i] + europe_africa[i] + asia[i]

with open('./output/world-map.bin', 'wb') as file:
    file.write(combined_world_map)
