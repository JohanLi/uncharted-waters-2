import numpy


def get():
    color_map = {
        0: '000000',
        1: '00a261',
        2: 'd34100',
        3: 'f3a261',
        4: '0041d3',
        5: '00a2f3',
        6: 'd361a2',
        7: 'f3e3d3',
        8: 'transparent',
    }

    raw_bytes = numpy.fromfile('./raw/DATA1.011', 'uint8')
    raw_bytes = numpy.split(raw_bytes, 2)[1]
    raw_bits = numpy.unpackbits(raw_bytes)

    width = 32
    height = 32
    bits_per_pixel = 4
    bits_per_pixel_block = 64

    sprites = len(raw_bits) // (width * height * bits_per_pixel)
    block_increment = bits_per_pixel_block // bits_per_pixel

    output = []
    pixel_blocks = numpy.split(raw_bits, len(raw_bits) // bits_per_pixel_block)

    for block in pixel_blocks:
        for i in range(block_increment):
            pixel_bits = ''.join(map(str, block[i::block_increment]))
            pixel_value = int(pixel_bits, 2)

            if color_map[pixel_value] == 'transparent':
                rgb = [0, 0, 0, 0]
            else:
                rgb = list(bytes.fromhex(color_map[pixel_value])) + [255]

            output.append(rgb)

    return numpy.array(output, 'uint8').reshape((sprites, width, height, 4))
