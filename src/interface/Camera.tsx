import React from 'react';

/*
  This component should never be rerendered — it’s updated by the game loop.
  The reason this component exists in React is so that the interface can
  co-exist without having to use absolute positioning.
 */

function Camera() {
  return (
    <canvas id="camera" width="1280" height="800" className="cursor-none" />
  );
}

export default React.memo(Camera, () => true);
