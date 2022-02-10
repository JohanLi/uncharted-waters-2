# Uncharted Waters: New Horizons

![build status](https://github.com/JohanLi/uncharted-waters-2/actions/workflows/build.yml/badge.svg?branch=master)

[Uncharted Waters: New Horizons](https://en.wikipedia.org/wiki/Uncharted_Waters#Uncharted_Waters:_New_Horizons)
(大航海時代II) is an open world RPG and simulation game from 1994, set during
the Age of Exploration. Being the favorite game of my childhood, I’m remaking
it using web technologies.

This is not meant to be even close to a full remake. I’m a web developer
transitioning to doing consulting work — this side project lets prospective
employers see my code.

<p align="center">
  <img src="https://media.githubusercontent.com/media/JohanLi/uncharted-waters-2/readme-assets/uncharted-waters-2.png" alt="Uncharted Waters: New Horizons">
  Screenshots of the original game
</p>

## Features

- Walking around in any of the 130 ports and entering their buildings.
- Sailing around the world map, where your speed takes into account all the
  factors of the original game.

This game can be played at [https://johan.li/uncharted-waters-2/](https://johan.li/uncharted-waters-2/).

#### Next up on the roadmap

- Markets
  - Trade goods, taking into account price indices.
- Shipyards
  - Buy and remodel used ships.
- Pubs
  - Recruit crew.

## Architecture

The game is made up of two parts:
- The **game** itself, a canvas element
- An **interface**/GUI, handled by React

The **game loop** reads **State** and **Input**, and updates the canvas element.

During gameplay, **actions** are called to update **State**. Actions themselves
can call **updateInterface**, which wraps React’s `useState` hooks.

**Assets** makes sure the images and game data is loaded before the game starts.

<p align="center">
  <img src="https://media.githubusercontent.com/media/JohanLi/uncharted-waters-2/readme-assets/architecture.png" alt="Architecture" width="560">
</p>

The two parts maintain their own local state, e.g., keeping track of the
active menu item or where the NPCs are in a port. Input can also be handled
locally, particularly when it comes to the interface.

#### Game loop

Uses `requestAnimationFrame()`.

State changes, such as reading Input and translating it to movement, don’t
occur every frame — a check is performed to see if enough time has passed.
Each frame does, however, interpolate movement for smoother graphics.

#### Why isn’t a state management library used?

In contrast to most web apps, the game code is imperative. It doesn’t need
to react to changes because it’s looped non-stop. While using a single
Redux store for both the game and the interface seems to be a clean approach,
it’s too slow if we want to maintain 60 fps.

The interface alone is too simple to warrant using Redux.

#### Future considerations

- Players need the ability to save and resume: State, and some local state,
  needs to be serialized and stored in localStorage, on a server, or both.
- Using a service worker so the game can be played offline.
- Pathfinding for NPC fleets.
