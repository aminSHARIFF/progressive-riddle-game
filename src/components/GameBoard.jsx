import React from 'react'

const GameBoard = ({ riddle, userAnswer, setUserAnswer, feedback, showHint, triesLeft, onSubmit }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSubmit()
    }
  }

  // Create tries indicators
  const triesIndicators = Array.from({ length: 3 }, (_, index) => (
    <span 
      key={index}
      className={`try-indicator ${index < triesLeft ? 'active' : 'used'}`}
      title={index < triesLeft ? 'Try available' : 'Try used'}
    >
      ●
    </span>
  ))

  return (
    <div className="game-board">
      <div className="riddle-card">
        
        
        <div className="riddle-text">
          <p>{riddle.riddle}</p>
        </div>
        
        {showHint && (
          <div className="hint-container">
            <span className="hint-label">💡 Hint:</span>
            <p className="hint-text">{riddle.hint}</p>
          </div>
        )}
        
        <div className="answer-section">
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your answer here..."
            className="answer-input"
          />
        </div>
        
        <div className="tries-indicator">
          <span className="tries-label">Tries remaining:</span>
          <div className="tries-dots">
            {triesIndicators}
          </div>
        </div>
        
        {feedback && (
          <div className={`feedback ${feedback.includes('Correct') ? 'success' : 'error'}`}>
            {feedback}
          </div>
        )}
        
        <div className="rules">
          <p className="rule-item">✓ Correct answer: +20 points</p>
          <p className="rule-item">✗ Wrong answer: -10 points</p>
          <p className="rule-item">💡 Correct answers grant hints</p>
          <p className="rule-item">🔄 Every 3rd level grants recovery</p>
          <p className="rule-item">⚠️ Only 3 tries per riddle!</p>
        </div>
      </div>
    </div>
  )
}

export default GameBoard