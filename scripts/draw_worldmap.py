from PIL import Image
import numpy
import pathlib
import tileset_large
import tileset_regular
import worldmap_blocks
import worldmap_processing
from apply_tilemap_to_tileset import apply_tilemap_to_tileset

pathlib.Path('./output').mkdir(parents=True, exist_ok=True)


for worldmap_part in range(3):
    blocks = worldmap_blocks.get(worldmap_part)

    block_rows = []
    for row in range(45):
        block_columns = numpy.concatenate(blocks[row, :30], axis=1)
        block_rows.append(block_columns)

    blocks = numpy.concatenate(block_rows, axis=0)

    worldmap = apply_tilemap_to_tileset(blocks, tileset_large.get())
    worldmap = worldmap_processing.fill_deserts(worldmap)
    worldmap = worldmap_processing.replace_coasts(worldmap)
    worldmap = worldmap_processing.replace_desert_coasts(worldmap)
    worldmap = worldmap_processing.update_frigid_and_temperate_terrain(worldmap)

    worldmap_processing.manual_corrections(worldmap, worldmap_part)

    numpy.save('./output/' + str(worldmap_part), worldmap)

    worldmap = apply_tilemap_to_tileset(worldmap, tileset_regular.get())
    img = Image.fromarray(worldmap)
    img.save('./output/' + str(worldmap_part) + '.png')
