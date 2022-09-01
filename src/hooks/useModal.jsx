import { useState } from 'react';

/*Create useModal hook to change Modal state:
initial state at false 
function toggle to change isShowing value true/false */

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
    setIsShowing(!isShowing);
  }

  return {
    isShowing,
    toggle,
  };
};

export default useModal;
