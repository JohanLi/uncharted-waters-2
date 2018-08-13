let lastMoveTime = 0;

const percentNextMove = {
  update: () => {
    if (window.performance.now() - lastMoveTime < 67) {
      percentNextMove.percentNextMove = (window.performance.now() - lastMoveTime) / 67;
    } else {
      lastMoveTime = window.performance.now();
      percentNextMove.percentNextMove = 0;
    }
  },
  percentNextMove: 0,
};

export default percentNextMove;
