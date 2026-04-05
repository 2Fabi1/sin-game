import { useState, useRef, useEffect } from "react";

function SinInput({ value, onCorrect, onWrong, onTime }) {
  const [input, setInput] = useState("");

  const inputRef = useRef(null);
  const timeInterval = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    return () => {
      if (timeInterval.current) {
        clearInterval(timeInterval.current);
      }
    };
  }, []);

  const resetTimer = () => {
    if (timeInterval.current) {
      clearInterval(timeInterval.current);
      timeInterval.current = null;
    }
  };

  const handleInput = (e) => {
    if (!timeInterval.current) {
      timeInterval.current = setInterval(onTime, 16);
    }

    const userInput = e.target.value;
    const correct = Math.sin(value * Math.PI / 180).toFixed(4).slice(2); 

    setInput(userInput);

    if (correct.slice(0, userInput.length) === userInput) {
      if (userInput.length === correct.length) {
        setInput("");
        onCorrect();
        inputRef.current.select();
      }
    } else {
      resetTimer();
      setInput("");
      onWrong();
    }
  };

  return (
    <div>
    0.
    <input
      ref={inputRef}
      type="number"
      value={input}
      onChange={handleInput}
      style={{
        width: '100px',
        fontSize: '48px',
        textAlign: 'left',
        border: "0px",
        background: "transparent",
        fontWeight: "normal",
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
      }}
      onBlur={() => inputRef.current.focus()}
    />
    </div>
  );
}

export default SinInput;