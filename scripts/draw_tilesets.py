from PIL import Image
import numpy
from tileset import get_tileset, get_ships_tileset

import pathlib
pathlib.Path('./output').mkdir(parents=True, exist_ok=True)

tileset = get_tileset('day')
tileset = numpy.split(tileset, 8)
tileset = numpy.concatenate(tileset, axis=1)
tileset = numpy.concatenate(tileset, axis=1)
img = Image.fromarray(tileset)
img.save('./output/tileset.png')

tileset = get_ships_tileset()
tileset = numpy.split(tileset, 4)
tileset = numpy.concatenate(tileset, axis=1)
tileset = numpy.concatenate(tileset, axis=1)

img = Image.fromarray(tileset)
img.save('./output/ships_tileset.png')
