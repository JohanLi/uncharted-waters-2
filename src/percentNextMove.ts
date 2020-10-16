let lastMoveTime = 0;
let percentNextMove = 0;

export default {
  update: () => {
    if (window.performance.now() - lastMoveTime < 67) {
      percentNextMove = (window.performance.now() - lastMoveTime) / 67;
    } else {
      lastMoveTime = window.performance.now();
      percentNextMove = 0;
    }
  },
  get: () => percentNextMove,
};
