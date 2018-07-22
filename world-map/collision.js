const collision = (tiles, position) => {
  tiles = [
    tiles[position.y * 2160 + position.x],
    tiles[position.y * 2160 + position.x + 1],
    tiles[(position.y + 1) * 2160 + position.x],
    tiles[(position.y + 1) * 2160 + position.x + 1]
  ];

  return tiles.some((tile) => tile >= 50);
};

export default collision;
