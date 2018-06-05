import numpy


def get_tiles():
    raw_bytes = numpy.fromfile('./raw/DATA1.018', 'uint8')

    tiles = []
    location = 0

    while len(tiles) < 256:
        primitive = numpy.zeros((2, 2), 'uint8')
        primitive[0, 0] = raw_bytes[location]
        primitive[0, 1] = raw_bytes[location + 1]
        primitive[1, 0] = raw_bytes[location + 2]
        primitive[1, 1] = raw_bytes[location + 3]
        location += 4

        if not numpy.all(primitive < 128):
            primitive[0:2, 0:2] = 116

        tiles.append(primitive)

    bit_to_tile = {
        '0': 0,
        '1': 65,
    }
    for x in range(16):
        bits = bin(x)[2:6].zfill(4)

        tiles[x][0, 0] = bit_to_tile[bits[0]]
        tiles[x][0, 1] = bit_to_tile[bits[1]]
        tiles[x][1, 0] = bit_to_tile[bits[2]]
        tiles[x][1, 1] = bit_to_tile[bits[3]]

    return tiles
