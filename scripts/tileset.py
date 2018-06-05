import numpy


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


def get_tileset(time='day'):
    raw_bytes = numpy.fromfile('./raw/DATA1.011', 'uint8')
    raw_bits = numpy.unpackbits(raw_bytes)

    tileset = []
    tile_bits_list = numpy.split(raw_bits[:128 * 1024], 128)

    for tile_bits in tile_bits_list:
        tile_pixels = []

        for i in range(256):
            pixel_bits = ''.join(map(str, tile_bits[i::256]))
            pixel_value = int(pixel_bits, 2)
            rgb = list(bytes.fromhex(color_map[time][pixel_value]))
            tile_pixels.append(rgb)

        tileset.append(numpy.array(tile_pixels, 'uint8').reshape((16, 16, 3)))

    return tileset
