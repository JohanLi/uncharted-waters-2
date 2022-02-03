import { useState } from 'react';

import updateInterface from '../../../state/updateInterface';

const useFade = () => {
  const [fade, setFade] = useState<{ onComplete: () => void }>();

  updateInterface.fade = (onComplete) => {
    setFade({ onComplete });
  };

  const onAnimationEnd = () => {
    if (!fade) {
      return;
    }

    fade.onComplete();
    setFade(undefined);
  };

  return { fade, onAnimationEnd };
};

export default useFade;
