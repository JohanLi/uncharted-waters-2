import numpy


def get(world_map_part):
    raw_bytes = numpy.fromfile('./raw/WORLDMAP.00' + str(world_map_part), 'uint8')
    raw_bits = numpy.unpackbits(raw_bytes)

    blocks = []
    block_bits = raw_bits[2700 * 8:]

    bit_cursor = 0

    for _ in range(1350):
        template_difference = True if block_bits[bit_cursor] == 0 else False

        template_number_bits = block_bits[bit_cursor + 5:bit_cursor + 8]
        template_number = int(''.join(map(str, template_number_bits)), 2)
        template = get_template(template_number)

        bit_cursor += 8

        if template_difference:
            corrections = []

            for i in range(144):
                if block_bits[bit_cursor] == 1:
                    corrections.append(i)
                bit_cursor += 1

            for correction in corrections:
                diff_large_tile_bits = block_bits[bit_cursor:bit_cursor + 8]
                diff_large_tile = int(''.join(map(str, diff_large_tile_bits)), 2)
                template[correction] = diff_large_tile
                bit_cursor += 8

        blocks.append(template)

    return numpy.array(blocks, 'uint8').reshape((45, 30, 12, 12))


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
