const { useState } = require("react");

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]); //array with initial value

  const transition = (newMode, replace = false) => {
    if (replace) {
      setHistory((prev) => [...prev.slice(0, prev.length - 1), newMode]);
    } else {
      setHistory((prev) => [...prev, newMode]);
    }
  };

  const back = () => {
    if (history.length > 1) {
      setHistory((prev) => [...prev.slice(0, prev.length - 1)]);
    }
  };

  const mode = history[history.length - 1];
  return { mode, transition, back };
}
