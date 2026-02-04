import React, { useState, useEffect } from 'react';
import './App.css';
import riddles from './data/riddles';

function App() {
  const [currentRiddleIndex, setCurrentRiddleIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [tries, setTries] = useState(3);
  const [gameStatus, setGameStatus] = useState('playing'); 
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);

  const currentRiddle = riddles[currentRiddleIndex];

  const checkAnswer = () => {
    if (!userAnswer.trim()) return;
    
    if (userAnswer.trim().toLowerCase() === currentRiddle.answer.toLowerCase()) {
     
      setScore(prev => prev + (tries * 10));
      
      if (currentRiddleIndex === riddles.length - 1) {
        setGameStatus('won');
      } else {
        setCurrentRiddleIndex(prev => prev + 1);
        setTries(3);
        setUserAnswer('');
        setShowHint(false);
      }
    } else {
      
      if (tries === 1) {
        setGameStatus('lost');
      } else {
        setTries(prev => prev - 1);
      }
    }
  };

  const useHint = () => {
    if (!showHint) {
      setShowHint(true);
    }
  };

  const resetGame = () => {
    setCurrentRiddleIndex(0);
    setScore(0);
    setTries(3);
    setGameStatus('playing');
    setUserAnswer('');
    setShowHint(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      checkAnswer();
    }
  };

  if (gameStatus === 'won') {
    return (
      <div className="app">
        <header className="header">
          <h1> Game Complete!</h1>
        </header>
        <div className="game-container">
          <div className="results-screen">
            <h2>Congratulations! </h2>
            <p className="score-display">Final Score: <span className="score-value">{score}</span></p>
            <p className="message">You solved all 5 riddles!</p>
            <button className="reset-btn" onClick={resetGame}>Play Again</button>
          </div>
        </div>
      </div>
    );
  }

  if (gameStatus === 'lost') {
    return (
      <div className="app">
        <header className="header">
          <h1>Game Over</h1>
        </header>
        <div className="game-container">
          <div className="results-screen">
            <h2>Out of tries! </h2>
            <p className="message">The answer was: <strong>{currentRiddle.answer}</strong></p>
            <p className="score-display">Your Score: <span className="score-value">{score}</span></p>
            <button className="reset-btn" onClick={resetGame}>Try Again</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🧩 Progressive Riddle Game</h1>
        <p>Solve 5 riddles • 3 tries each</p>
      </header>

      <div className="game-container">
        <div className="left-panel">
          <div className="score-card">
            <div className="score-label">SCORE</div>
            <div className="score-value">{score}</div>
          </div>
          <div className="progress">
            <div className="progress-label">Riddle {currentRiddleIndex + 1}/5</div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${((currentRiddleIndex + 1) / 5) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="center-panel">
          <div className="riddle-card">
            <div className="difficulty">Difficulty: {currentRiddle.difficulty}</div>
            <h3 className="riddle-question">{currentRiddle.question}</h3>
            
            <div className="input-group">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your answer..."
                className="answer-input"
              />
              <button 
                onClick={checkAnswer}
                disabled={!userAnswer.trim()}
                className="submit-btn"
              >
                Check Answer
              </button>
            </div>

            {showHint && (
              <div className="hint-box">
                <span className="hint-icon">💡</span>
                <p>{currentRiddle.hint}</p>
              </div>
            )}
          </div>
        </div>

        <div className="right-panel">
          <div className="tries-card">
            <div className="tries-label">TRIES LEFT</div>
            <div className="tries-display">
              {[1, 2, 3].map((num) => (
                <div 
                  key={num} 
                  className={`try-dot ${num <= tries ? 'active' : 'used'}`}
                >
                  {num <= tries ? '✓' : '✗'}
                </div>
              ))}
            </div>
            <p className="tries-text">{tries} of 3 remaining</p>
            
            <button 
              onClick={useHint}
              disabled={showHint}
              className="hint-btn"
            >
              {showHint ? 'Hint Used' : 'Get Hint'}
            </button>
            
            <button 
              onClick={resetGame}
              className="reset-btn"
            >
              Reset Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
