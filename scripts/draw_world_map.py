from PIL import Image
import numpy
import pathlib
import tileset_large
import tileset_regular
import world_map_blocks
import world_map_processing
import helpers

pathlib.Path('./output').mkdir(parents=True, exist_ok=True)


for world_map_part in range(3):
    blocks = world_map_blocks.get(world_map_part)

    block_rows = []
    for row in range(45):
        block_columns = numpy.concatenate(blocks[row, :30], axis=1)
        block_rows.append(block_columns)

    blocks = numpy.concatenate(block_rows, axis=0)

    world_map = helpers.tilemap_to_tileset(blocks, tileset_large.get())
    world_map = world_map_processing.fill_deserts(world_map)
    world_map = world_map_processing.replace_coasts(world_map)
    world_map = world_map_processing.replace_desert_coasts(world_map)
    world_map = world_map_processing.update_frigid_and_temperate_terrain(world_map)

    world_map_processing.manual_corrections(world_map, world_map_part)

    with open('./output/world-map' + str(world_map_part) + '.bin', 'wb') as file:
        world_map_bytearray = bytearray(world_map.flatten())
        file.write(world_map_bytearray)

    world_map = helpers.tilemap_to_tileset(world_map, tileset_regular.get())

    img = Image.fromarray(world_map)
    img.save('./output/world-map' + str(world_map_part) + '.png')
