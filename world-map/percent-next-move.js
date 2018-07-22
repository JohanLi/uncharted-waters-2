let lastMoveTime = 0;

const percentNextMove = () => {
  if (window.performance.now() - lastMoveTime < 100) {
    return (window.performance.now() - lastMoveTime) / 100;
  }

  lastMoveTime = window.performance.now();
  return 0;
};

export default percentNextMove;
