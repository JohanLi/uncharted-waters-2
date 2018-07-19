import numpy


def get():
    raw_bytes = numpy.fromfile('./raw/DATA1.018', 'uint8')

    large_tiles = []
    large_tiles += first_sixteen()

    bit_cursor = 0 + 16 * 4

    for i in range(256 - 16):
        tile = []

        for j in range(4):
            regular_tile = raw_bytes[bit_cursor + j]

            # the large tileset references out of bounds regular tiles
            if regular_tile > 128:
                regular_tile = 0

            tile.append(regular_tile)

        bit_cursor += 4

        large_tiles.append(tile)

    for i in range(len(large_tiles)):
        large_tiles[i] = numpy.array(large_tiles[i], 'uint8').reshape((2, 2))

    return numpy.array(large_tiles, 'uint8')


def first_sixteen():
    large_tiles = []

    bit_to_regular_tile = {
        '0': 0,
        '1': 65,
    }

    for i in range(16):
        bits = bin(i)[2:].zfill(4)
        tile = []

        for c in bits:
            tile.append(bit_to_regular_tile[c])

        large_tiles.append(tile)

    return large_tiles
