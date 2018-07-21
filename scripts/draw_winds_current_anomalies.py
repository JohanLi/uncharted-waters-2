import numpy
import pathlib
from PIL import Image, ImageDraw, ImageFont
import helpers

pathlib.Path('./output').mkdir(parents=True, exist_ok=True)


# Uncharted Waters 2 divides the world map in three, with the Americas in the last part.
# This moves the Americas first for display purposes.
def shift_worldmap(wind_or_current):
    wind_or_current = numpy.split(wind_or_current, 15)
    wind_or_current = [numpy.roll(row, 10) for row in wind_or_current]

    return numpy.concatenate(wind_or_current)


raw_bytes = numpy.fromfile('./raw/WINDCUR.DAT', 'uint8')
winds_current = numpy.split(raw_bytes, 3)
winds_current_names = ['summer-winds', 'winter-winds', 'ocean-current']
font = ImageFont.truetype('./assets/Roboto-Bold.ttf', 16)

world_map = Image.open('./assets/world-map.png').convert('RGBA')
world_map_grid = Image.open('./assets/world-map-grid.png').convert('RGBA')

direction_icons = []
speed_icons = []

for i in range(8):
    im = Image.open('./assets/arrows/' + str(i) + '.png').convert('RGBA')
    icon = numpy.array(im)
    direction_icons.append(icon)

    im = Image.new('RGBA', (72, 72), (255, 255, 255, 0))
    ImageDraw.Draw(im).text((4, 4), str(i), font=font, fill=(0, 0, 0, 255))
    icon = numpy.array(im)
    speed_icons.append(icon)

for i, wind_or_current in enumerate(winds_current):
    wind_or_current = shift_worldmap(wind_or_current)
    raw_bits = numpy.unpackbits(wind_or_current)
    bit_cursor = 0

    directions = []
    speeds = []

    for _ in range(450):
        direction_bits = ''.join(map(str, raw_bits[bit_cursor + 2:bit_cursor + 5]))
        direction = int(direction_bits, 2)
        directions.append(direction)

        speed_bits = ''.join(map(str, raw_bits[bit_cursor + 5:bit_cursor + 8]))
        speed = int(speed_bits, 2)
        speeds.append(speed)

        bit_cursor += 8

    directions = numpy.array(directions).reshape(15, 30)
    directions = helpers.tilemap_to_tileset(directions, direction_icons)
    directions = Image.fromarray(directions)

    speeds = numpy.array(speeds).reshape(15, 30)
    speeds = helpers.tilemap_to_tileset(speeds, speed_icons)
    speeds = Image.fromarray(speeds)

    directions_and_speeds = Image.alpha_composite(directions, speeds)
    directions_and_speeds_with_grid = Image.alpha_composite(directions_and_speeds, world_map_grid)

    im = Image.blend(world_map, directions_and_speeds_with_grid, 0.75)
    im.save('./output/world-map-' + winds_current_names[i] + '.png')

anomaly_icons = []
anomaly_names = ['Storm', 'Fog', 'No Wind', 'Storm +\nMissing', '?', '']
anomaly_bits_map = {
    9: 0,
    11: 1,
    10: 2,
    13: 3,
    4: 4,
    0: 5,
}

for name in anomaly_names:
    im = Image.new('RGBA', (72, 72), (255, 255, 255, 255))
    draw = ImageDraw.Draw(im)

    base_width, base_height = im.size
    width, height = draw.textsize(name, font)

    draw.text(
        ((base_width - width) / 2, (base_height - height) / 2),
        name,
        font=font,
        fill=(0, 0, 0, 255)
    )
    icon = numpy.array(im)
    anomaly_icons.append(icon)

summer_winds = shift_worldmap(winds_current[0])
summer_winds_raw_bits = numpy.unpackbits(summer_winds)

currents = shift_worldmap(winds_current[2])
currents_raw_bits = numpy.unpackbits(currents)

bit_cursor = 0

anomalies = []

for _ in range(450):
    winds_anomaly_bits = summer_winds_raw_bits[bit_cursor + 0:bit_cursor + 2]
    currents_anomaly_bits = currents_raw_bits[bit_cursor + 0:bit_cursor + 2]

    anomaly_bits = ''.join(map(
        str,
        numpy.concatenate((winds_anomaly_bits, currents_anomaly_bits))
    ))
    anomaly = int(anomaly_bits, 2)
    anomalies.append(anomaly_bits_map[anomaly])

    bit_cursor += 8

anomalies = numpy.array(anomalies).reshape(15, 30)
anomalies = helpers.tilemap_to_tileset(anomalies, anomaly_icons)

anomalies = Image.fromarray(anomalies)
anomalies = Image.alpha_composite(anomalies, world_map_grid)
im = Image.blend(world_map, anomalies, 0.75)
im.save('./output/world-map-anomalies.png')
