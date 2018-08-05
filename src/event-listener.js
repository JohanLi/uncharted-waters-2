const active = [];

const eventListener = {
  add: (type, listener, target = document) => {
    active.push({ type, listener, target });
    target.addEventListener(type, listener);
  },
  removeAll: () => {
    active.forEach(({ type, listener, target }) => target.removeEventListener(type, listener));
    active.splice(0, active.length);
  },
};

export default eventListener;
