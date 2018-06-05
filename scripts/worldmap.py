import os
import glob
import numpy
from PIL import Image


def get_template(number):
    default = numpy.zeros((12, 12), 'uint8')

    if number == 0:
        default[:,:6] = 15

    if number == 1:
        default[:,6:] = 15

    if number == 2:
        default[:6,:] = 15

    if number == 3:
        default[6:, :] = 15

    if number == 4:
        default[:, :] = 15

    return default.flatten()


def get_worldmap(i):
    raw_bytes = numpy.fromfile('./raw/WORLDMAP.00' + i, 'uint8')
    raw_bits = numpy.unpackbits(raw_bytes)

    map_large_tiles = []
    map_large_tiles_bits = raw_bits[21600:]

    bit_cursor = 0

    while len(map_large_tiles) < 1350:
        template_difference = True if map_large_tiles_bits[bit_cursor] == 0 else False

        template_number_bits = map_large_tiles_bits[bit_cursor + 5:bit_cursor + 8]
        template_number = int(''.join(map(str, template_number_bits)), 2)
        template = get_template(template_number)

        bit_cursor += 8

        if template_difference:
            corrections = []

            for i in range(144):
                if map_large_tiles_bits[bit_cursor] == 1:
                    corrections.append(i)
                bit_cursor += 1

            for correction in corrections:
                diff_large_tile_bits = map_large_tiles_bits[bit_cursor:bit_cursor + 8]
                diff_large_tile = int(''.join(map(str, diff_large_tile_bits)), 2)
                template[correction] = diff_large_tile
                bit_cursor += 8

        map_large_tiles.append(template)

    return numpy.array(map_large_tiles, 'uint8').reshape((45, 30, 12, 12))
