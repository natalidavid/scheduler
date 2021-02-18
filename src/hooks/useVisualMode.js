import { useState } from "react";

const useVisualMode = function (initial) {

  // const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function (newMode) {

    setHistory(prev => {
      return [...prev, newMode];
    });
  };

  const back = function () {

    setHistory(prev => {

      // const newHistory = [...prev.slice(0, history.length - 1)]
      const newHistory = [...prev];
      newHistory.pop();
      return newHistory;
      
    });

  };

  const mode = history.slice(-1)[0];
  return { mode, transition, back };
};

export default useVisualMode;