import numpy
from PIL import Image


def apply_tilemap(tiles, tilemap):
    width, height = tiles.shape

    if len(tilemap[0].shape) == 3:
        width_tilemap, height_tilemap, depth = tilemap[0].shape
        output = numpy.zeros((width * width_tilemap, height * height_tilemap, depth), 'uint8')
    else:
        width_tilemap, height_tilemap = tilemap[0].shape
        output = numpy.zeros((width * width_tilemap, height * height_tilemap), 'uint8')

    for x in range(width):
        for y in range(height):
            x_new = x * width_tilemap
            y_new = y * height_tilemap
            output[
                x_new:x_new + width_tilemap,
                y_new:y_new + height_tilemap,
            ] = tilemap[tiles[x, y]]

    return output
