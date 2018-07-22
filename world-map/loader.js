const isObject = url => typeof url === "object";
const isImage = url => url.substr(-4) === ".png";
const isBinary = url => url.substr(-4) === ".bin";

const loadImage = (image) => new Promise((resolve, reject) => {
  const img = new Image();
  img.src = image;

  img.onload = () => {
    return resolve(img);
  };

  img.onerror = () => {
    return reject(Error(`${image} could not be loaded!`));
  };
});

const loadBinary = (binary) => fetch(binary)
  .then((response) => response.arrayBuffer())
  .then((response) => new Uint8Array(response));

const load = async (assets) => {
  const toPromises = (a) => {
    Object.keys(a).forEach((key) => {
      if (isObject(a[key])) {
        toPromises(a[key]);
      } else if (isImage(a[key])) {
        promises.push(loadImage(a[key]));
      } else if (isBinary(a[key])) {
        promises.push(loadBinary(a[key]));
      }
    });
  };

  const updateProperties = (a) => {
    Object.keys(a).forEach((key) => {
      if (isObject(a[key])) {
        updateProperties(a[key]);
      } else {
        a[key] = resolvedPromises.shift();
      }
    });
  };

  const promises = [];
  toPromises(assets);
  const resolvedPromises = await Promise.all(promises);
  updateProperties(assets);

  return assets;
};

export default load;
