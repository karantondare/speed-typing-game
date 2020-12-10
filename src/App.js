import React, { useState, useEffect, useRef } from 'react';

export default function App() {
  const STARTING_TIME = 20;

  const [text, setText] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME);
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const textareaRef = useRef(null);

  const handleChange = (e) => setText(e.target.value);

  function calculateWordCount(text) {
    const wordsArr = text.trim().split(' ');
    return wordsArr.filter((word) => word !== '').length;
  }

  function startGame() {
    setIsTimeRunning(true);
    setTimeRemaining(STARTING_TIME);
    setText('');
    textareaRef.current.disabled = false;
    textareaRef.current.focus();
  }

  function endGame() {
    setIsTimeRunning(false);
    setWordCount(calculateWordCount(text));
  }

  useEffect(() => {
    if (isTimeRunning && timeRemaining > 0) {
      setTimeout(() => {
        setTimeRemaining((oldTime) => oldTime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      endGame();
    }
  }, [timeRemaining, isTimeRunning]);

  return (
    <div>
      <h1>How fast do you type?</h1>
      <textarea
        ref={textareaRef}
        onChange={handleChange}
        value={text}
        disabled={!isTimeRunning}
      />
      <h4>Time remaining: {timeRemaining}</h4>
      <button onClick={startGame} disabled={isTimeRunning}>
        Start
      </button>
      <h1>Word Count: {wordCount}</h1>
    </div>
  );
}
