import { useState } from 'react';

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);
  const reload = () => window.location.reload();
  function toggle() {
    setIsShowing(!isShowing);
  }

  return {
    isShowing,
    toggle,
    reload,
  };
};

export default useModal;
