import numpy
from PIL import Image
from tiles import get_tiles
from tileset import get_tileset
from worldmap import get_worldmap
from worldmap_helpers import apply_desert_tiles, apply_edges, apply_desert_edges, apply_frigid_and_temperate_tiles
from apply_tilemap import apply_tilemap

import pathlib
pathlib.Path('./output').mkdir(parents=True, exist_ok=True)

for i in range(3):
    i = str(i)
    worldmap = get_worldmap(i)

    vertical = []
    for row in range(45):
        vertical.append(numpy.concatenate(worldmap[row, :30], axis=1))

    worldmap = numpy.concatenate(vertical, axis=0)

    worldmap = apply_tilemap(worldmap, get_tiles())
    worldmap = apply_desert_tiles(worldmap)
    worldmap = apply_edges(worldmap)
    worldmap = apply_desert_edges(worldmap)
    worldmap = apply_frigid_and_temperate_tiles(worldmap)

    # worldmap 000 corrections
    if i == '0':
        worldmap[444, 366] = 28
        worldmap[445, 366] = 28
        worldmap[489, 415] = 27
        worldmap[1055, 266] = 23
        worldmap[1055, 267] = 23

    # worldmap 002 corrections
    if i == '2':
        worldmap[890, 134] = 26
        worldmap[890, 135] = 26
        worldmap[1056, 417] = 13
        worldmap[1061, 435] = 12

    numpy.save('./output/' + i, worldmap)

    worldmap = apply_tilemap(worldmap, get_tileset())
    img = Image.fromarray(worldmap)
    img.save('./output/' + i + '.png')
