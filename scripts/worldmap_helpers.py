import numpy
import coast

land_tiles = list(range(51, 65 + 1)) + [73, 81, 89, 97] + list(range(105, 127 + 1))
desert_tiles = [25, 26, 28, 29, 30, 31, 32, 89, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114]
possible_desert_edges = []


def apply_desert_tiles(worldmap):
    rows, columns = worldmap.shape

    for column in range(columns):
        for row in range(rows):
            try:
                if worldmap[row, column] == 89:
                    if worldmap[row, column + 1] == 65:
                        worldmap[row, column + 1] = 89

                    if worldmap[row + 1, column] == 65:
                        worldmap[row + 1, column] = 89
            except IndexError:
                pass

    return worldmap


def apply_edges(worldmap):
    worldmap_copy = numpy.copy(worldmap)
    rows, columns = worldmap_copy.shape

    for row in range(rows):
        for column in range(columns):
            if worldmap_copy[row, column] != 0:
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
                    if worldmap_copy[offset[0], offset[1]] in land_tiles:
                        x += '1'

                        if worldmap_copy[offset[0], offset[1]] in desert_tiles:
                            if [row, column] not in possible_desert_edges:
                                possible_desert_edges.append([row, column])
                    else:
                        x += '0'

            tile = coast.raw_bytes[int(x, 2)]
            worldmap[row, column] = tile

    return worldmap


def apply_desert_edges(worldmap):
    for edge in possible_desert_edges:
        edge_tile = worldmap[edge[0], edge[1]]

        offsets = desert_edge_offsets(edge_tile, edge[0], edge[1])

        if not offsets:
            continue

        is_desert = True

        for offset in offsets:
            if worldmap[offset['offset'][0], offset['offset'][1]] not in offset['desert_tiles']:
                is_desert = False

        if is_desert and worldmap[edge[0], edge[1]] != 0:
            worldmap[edge[0], edge[1]] = worldmap[edge[0], edge[1]] + 24

    return worldmap


def desert_edge_offsets(tile, row, column):
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


def apply_frigid_and_temperate_tiles(worldmap):
    rows, columns = worldmap.shape

    for row in range(rows):
        for column in range(columns):
            if worldmap[row, column] not in list(range(1, 8 + 1)) + list(range(65, 72 + 1)):
                continue

            if row < 24 or row >= rows - 24: # frigid
                worldmap[row, column] = worldmap[row, column] + 16
            elif row < 24 * 14 or row >= 24 * 31: # temperate
                worldmap[row, column] = worldmap[row, column] + 8

    return worldmap
