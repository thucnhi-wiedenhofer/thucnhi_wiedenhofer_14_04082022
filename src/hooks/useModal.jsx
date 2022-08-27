import { useState } from 'react';

/*Create useModal hook to change Modal state:
initial state at false 
function toggle to change isShowing value true/false */

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);
  //function to refresh form
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
