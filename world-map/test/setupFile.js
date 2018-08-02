document.getElementById = (tagName) => {
  if (tagName === 'camera') {
    return document.createElement('canvas');
  }

  return document.getElementById(tagName);
};

HTMLCanvasElement.prototype.getContext = () => ({
  scale: () => {},
  drawImage: () => {},
});
