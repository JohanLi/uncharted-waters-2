from PIL import Image
import numpy

color_map = {
    'dawn': {
        0: '000000',
        1: '8292A2',
        2: '00A261',
        3: '0061A2',
        4: 'D34100',
        5: 'A27100',
        6: 'F3A261',
        7: '009282',
        8: '0041D3',
        9: '0041A2',
        10: '00A2F3',
        11: '003041',
        12: 'D361A2',
        13: '928220',
        14: 'F3E3D3',
        15: 'D3E3F3',
    },
    'day': {
        0: '000000',
        1: '717192',
        2: '00A261',
        3: '0082F3',
        4: 'D34100',
        5: 'A26100',
        6: 'F3A261',
        7: '00B261',
        8: '0041D3',
        9: '0041C3',
        10: '00A2F3',
        11: '007161',
        12: 'D361A2',
        13: 'E3B251',
        14: 'F3E3D3',
        15: 'F3E3D3',
    },
    'dusk': {
        0: '000000',
        1: '826130',
        2: '00A261',
        3: '617192',
        4: 'D34100',
        5: '923000',
        6: 'F3A261',
        7: '928261',
        8: '0041D3',
        9: '415192',
        10: '00A2F3',
        11: '004141',
        12: 'D361A2',
        13: 'C39271',
        14: 'F3E3D3',
        15: 'F3D3A2',
    },
    'night': {
        0: '000000',
        1: '414141',
        2: '00A261',
        3: '005161',
        4: 'D34100',
        5: '614100',
        6: 'F3A261',
        7: '004141',
        8: '0041D3',
        9: '004171',
        10: '00A2F3',
        11: '003041',
        12: 'D361A2',
        13: '515130',
        14: 'F3E3D3',
        15: '616171',
    },
}


def get(tileset, time='day'):
    raw_bytes = numpy.fromfile('./raw/tilesets/PORTCHIP.' +  f'{tileset * 2:03}', 'uint8')
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


tilesets = []

for i in range(7):
    tileset = get(i)
    tileset = numpy.concatenate(tileset, axis=1)
    tilesets.append(tileset)

tileset = numpy.concatenate(tilesets, axis=0)
img = Image.fromarray(tileset)
img.save('./output/port-tilesets.png')
