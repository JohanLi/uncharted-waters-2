# Uncharted Waters: New Horizons (大航海時代II)

[Uncharted Waters: New Horizons](https://en.wikipedia.org/wiki/Uncharted_Waters#Uncharted_Waters:_New_Horizons)
is an open world RPG and simulation game, set during the Age of Exploration
and released by Koei in 1994. Being the favorite game of my childhood,
I have chosen to remake and rework this game using web technologies as a side
project.

<img width="950" height="594" alt="Uncharted Waters: New Horizons" src="https://media.githubusercontent.com/media/JohanLi/uncharted-waters-2/readme-assets/uncharted-waters-2.png">

## Current features

The current state of this remake can be played at [https://johan.li/uncharted-waters-2/](https://johan.li/uncharted-waters-2/).

The following features are implemented:

- Walking around in any port and entering buildings
- Sailing around the world map, going ashore and setting sail

## Development status

### 2022-01-01

Development has resumed after three and a half years! You guys somehow continue to
find your way to this repo to star and fork it – thank you!

The following is being worked on:

- [x] A general code cleanup, and conversion to TypeScript.
- [x] When sailing, the rendering of the game causes high CPU usage. Each and every tile is currently
  being redrawn for each frame, when much of the previous frame can be reused. Medieval ships can’t
  teleport after all, last I checked.
- Markets, Shipyards, and sailing. You should be able to do sail from port to port, trade goods,
  and upgrade your fleet. To limit development scope, each ship type will have a fixed number of
  crew members (e.g., 60 for Venetian Galleass).
