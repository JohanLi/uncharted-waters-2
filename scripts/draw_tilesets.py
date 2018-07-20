from PIL import Image
import numpy
import pathlib
import tileset_regular
import tileset_large
import tileset_ship
import helpers

pathlib.Path('./output').mkdir(parents=True, exist_ok=True)


def regular_tileset():
    tileset = tileset_regular.get()
    tileset = numpy.split(tileset, 8)
    tileset = numpy.concatenate(tileset, axis=1)
    tileset = numpy.concatenate(tileset, axis=1)
    img = Image.fromarray(tileset)
    img.save('./output/regular_tileset.png')


def large_tileset():
    large_tileset = tileset_large.get()
    regular_tileset = tileset_regular.get()

    large_tileset = numpy.split(large_tileset, 16)
    large_tileset = numpy.concatenate(large_tileset, axis=1)
    large_tileset = numpy.concatenate(large_tileset, axis=1)

    large_tileset = helpers.tilemap_to_tileset(large_tileset, regular_tileset)

    img = Image.fromarray(large_tileset)
    img.save('./output/large_tileset.png')


def ship_tileset():
    tileset = tileset_ship.get()
    tileset = numpy.split(tileset, 4)
    tileset = numpy.concatenate(tileset, axis=1)
    tileset = numpy.concatenate(tileset, axis=1)

    img = Image.fromarray(tileset)
    img.save('./output/ship_tileset.png')


regular_tileset()
large_tileset()
ship_tileset()
