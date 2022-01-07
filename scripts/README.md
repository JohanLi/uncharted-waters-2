## Scripts

Here you will find scripts that draw:

* the tilesets used for the world map, including the one for ships
* all three parts of the world map
* a visualization of winds and ocean current, as well as zones that,
among others, cause storms

### Getting Started

Using this directory as root:

    pip install -r requirements.txt

The scripts available to run, which all produce files in a newly created
**output** directory are:

* draw_tilesets.py
* draw_world_map.py
* draw_winds_current_anomalies.py
* combine_world_map_parts.py
* ports/combine_tilemaps.py
* ports/draw_tilesets.py
* ports/extract_metadata.py
* ships/extract_metadata.py

Python 3.8.12 was used.

### Example Output

<img width="256" height="128" alt="Regular Tileset" src="https://media.githubusercontent.com/media/JohanLi/uncharted-waters-2/readme-assets/regular-tileset.png">

<img width="512" height="512" alt="Large Tileset" src="https://media.githubusercontent.com/media/JohanLi/uncharted-waters-2/readme-assets/large-tileset.png">

<img width="256" height="128" alt="Ship Tileset" src="https://media.githubusercontent.com/media/JohanLi/uncharted-waters-2/readme-assets/ship-tileset.png">

<img width="950" height="475" src="https://media.githubusercontent.com/media/JohanLi/uncharted-waters-2/readme-assets/world-map.png">
