import numpy


def get_tileset(time='day'):
    color_map = {
        'dawn': {
            0: '000000',
            1: '8292A2',
            3: '0061A2',
            4: 'D34100',
            5: 'A27100',
            6: 'F3A261',
            7: '009282',
            8: '0041D3',
            9: '0041A2',
            10: '00A2F3',
            11: '003041',
            13: '928220',
            14: 'F3E3D3',
            15: 'D3E3F3',
        },
        'day': {
            0: '000000',
            1: '717192',
            3: '0082F3',
            4: 'D34100',
            5: 'A26100',
            6: 'F3A261',
            7: '00B261',
            8: '0041D3',
            9: '0041C3',
            10: '00A2F3',
            11: '007161',
            13: 'E3B251',
            14: 'F3E3D3',
            15: 'F3E3D3',
        },
        'dusk': {
            0: '000000',
            1: '826130',
            3: '617192',
            4: 'D34100',
            5: '923000',
            6: 'F3A261',
            7: '928261',
            8: '0041D3',
            9: '415192',
            10: '00A2F3',
            11: '004141',
            13: 'C39271',
            14: 'F3E3D3',
            15: 'F3D3A2',
        },
        'night': {
            0: '000000',
            1: '414141',
            3: '005161',
            4: 'D34100',
            5: '614100',
            6: 'F3A261',
            7: '004141',
            8: '0041D3',
            9: '004171',
            10: '00A2F3',
            11: '003041',
            13: '515130',
            14: 'F3E3D3',
            15: '616171',
        },
    }

    raw_bytes = numpy.fromfile('./raw/DATA1.011', 'uint8')
    raw_bytes = numpy.split(raw_bytes, 2)[0]
    raw_bits = numpy.unpackbits(raw_bytes)

    width = 16
    height = 16
    bits_per_pixel = 4
    bits_per_pixel_block = 1024

    sprites = len(raw_bits) // (width * height * bits_per_pixel)
    block_increment = bits_per_pixel_block // bits_per_pixel

    output = []
    pixel_blocks = numpy.split(raw_bits, len(raw_bits) // bits_per_pixel_block)

    for block in pixel_blocks:
        for i in range(block_increment):
            pixel_bits = ''.join(map(str, block[i::block_increment]))
            pixel_value = int(pixel_bits, 2)
            rgb = list(bytes.fromhex(color_map[time][pixel_value]))

            output.append(rgb)

    return numpy.array(output, 'uint8').reshape((sprites, width, height, 3))


def get_ships_tileset():
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
