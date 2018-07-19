import numpy


def apply_tilemap_to_tileset(tilemap, tileset):
    width, height = tilemap.shape

    if len(tileset[0].shape) == 3:
        width_tilemap, height_tilemap, depth = tileset[0].shape
        output = numpy.zeros((width * width_tilemap, height * height_tilemap, depth), 'uint8')
    else:
        width_tilemap, height_tilemap = tileset[0].shape
        output = numpy.zeros((width * width_tilemap, height * height_tilemap), 'uint8')

    for x in range(width):
        for y in range(height):
            x_new = x * width_tilemap
            y_new = y * height_tilemap
            output[
                x_new:x_new + width_tilemap,
                y_new:y_new + height_tilemap,
            ] = tileset[tilemap[x, y]]

    return output
