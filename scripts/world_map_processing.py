import numpy

land_tiles = list(range(51, 65 + 1)) + [73, 81, 89, 97] + list(range(105, 127 + 1))
desert_tiles = [25, 26, 28, 29, 30, 31, 32, 89, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114]
possible_desert_coasts = []
coastal_map = numpy.fromfile('./raw/DATA1.010', 'uint8')


def fill_deserts(world_map):
    rows, columns = world_map.shape

    for column in range(columns):
        for row in range(rows):
            try:
                if world_map[row, column] == 89:
                    if world_map[row, column + 1] == 65:
                        world_map[row, column + 1] = 89

                    if world_map[row + 1, column] == 65:
                        world_map[row + 1, column] = 89
            except IndexError:
                pass

    return world_map


def replace_coasts(world_map):
    world_map_copy = numpy.copy(world_map)
    rows, columns = world_map_copy.shape

    for row in range(rows):
        for column in range(columns):
            if world_map_copy[row, column] != 0:
                continue

            x = '1'

            offsets = [
                [row - 1, column - 1],
                [row, column - 1],
                [row + 1, column - 1],
                [row + 1, column],
                [row + 1, column + 1],
                [row, column + 1],
                [row - 1, column + 1],
                [row - 1, column],
            ]

            for offset in offsets:
                if offset[0] < 0 or offset[1] < 0 or offset[0] >= rows or offset[1] >= columns:
                    x += '0'
                else:
                    if world_map_copy[offset[0], offset[1]] in land_tiles:
                        x += '1'

                        if world_map_copy[offset[0], offset[1]] in desert_tiles:
                            if [row, column] not in possible_desert_coasts:
                                possible_desert_coasts.append([row, column])
                    else:
                        x += '0'

            tile = coastal_map[int(x, 2)]
            world_map[row, column] = tile

    return world_map


def replace_desert_coasts(world_map):
    for coast in possible_desert_coasts:
        coast_tile = world_map[coast[0], coast[1]]

        offsets = desert_coast_offsets(coast_tile, coast[0], coast[1])

        if not offsets:
            continue

        is_desert = True

        for offset in offsets:
            if world_map[offset['offset'][0], offset['offset'][1]] not in offset['desert_tiles']:
                is_desert = False

        if is_desert and world_map[coast[0], coast[1]] != 0:
            world_map[coast[0], coast[1]] = world_map[coast[0], coast[1]] + 24

    return world_map


def desert_coast_offsets(tile, row, column):
    adjacents_to_check = {
        1: [1, 2, 8],
        2: [8],
        3: [6, 7, 8],
        4: [2],
        5: [6],
        6: [2, 3, 4],
        7: [4],
        8: [4, 5, 6],
    }

    adjacent_offsets_and_possible_tiles = {
        1: {
            'offset': [row - 1, column - 1],
            'desert_tiles': [89, 105],
        },
        2: {
            'offset': [row, column - 1],
            'desert_tiles': [89, 105, 106, 108, 110, 111],
        },
        3: {
            'offset': [row + 1, column - 1],
            'desert_tiles': [89, 110],
        },
        4: {
            'offset': [row + 1, column],
            'desert_tiles': [89, 108, 109, 110, 111, 112],
        },
        5: {
            'offset': [row + 1, column + 1],
            'desert_tiles': [89, 112],
        },
        6: {
            'offset': [row, column + 1],
            'desert_tiles': [89, 106, 107, 109, 111, 112],
        },
        7: {
            'offset': [row - 1, column + 1],
            'desert_tiles': [89, 107],
        },
        8: {
            'offset': [row - 1, column],
            'desert_tiles': [89, 105, 106, 107, 108, 109],
        },
    }

    try:
        offsets = []

        for x in adjacents_to_check[tile]:
            offsets.append(adjacent_offsets_and_possible_tiles[x])

        return offsets
    except KeyError:
        return []


def update_frigid_and_temperate_terrain(world_map):
    rows, columns = world_map.shape

    for row in range(rows):
        for column in range(columns):
            if world_map[row, column] not in list(range(1, 8 + 1)) + list(range(65, 72 + 1)):
                continue

            if row < 24 or row >= rows - 24: # frigid
                world_map[row, column] = world_map[row, column] + 16
            elif row < 24 * 14 or row >= 24 * 31: # temperate
                world_map[row, column] = world_map[row, column] + 8

    return world_map


def manual_corrections(world_map, world_map_part):
    if world_map_part == 0:
        world_map[444, 366] = 28
        world_map[445, 366] = 28
        world_map[489, 415] = 27
        world_map[1055, 266] = 23
        world_map[1055, 267] = 23

    if world_map_part == 2:
        world_map[890, 134] = 26
        world_map[890, 135] = 26
        world_map[1056, 417] = 13
        world_map[1061, 435] = 12
