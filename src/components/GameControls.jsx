import React from 'react'

const GameControls = ({ onHint, onRecovery, onSubmit, hints, recoveryAvailable, triesLeft }) => {
  // Handle hint button click
  const handleHint = (e) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('Hint button clicked')
    onHint()
  }

  // Handle recovery button click
  const handleRecovery = (e) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('Recovery button clicked')
    onRecovery()
  }

  // Handle submit button click
  const handleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('Submit button clicked')
    onSubmit()
  }

  return (
    <div className="game-controls">
      <div className="controls-row">
        <button 
          className="control-btn hint-btn"
          onClick={handleHint}
          disabled={hints === 0}
        >
          <span className="btn-icon">💡</span>
          <span className="btn-text">Use Hint {hints > 0 && `(${hints})`}</span>
        </button>
        
        <button 
          className="control-btn submit-btn"
          onClick={handleSubmit}
        >
          <span className="btn-icon">✅</span>
          <span className="btn-text">Submit Answer</span>
        </button>
        
        <button 
          className="control-btn recovery-btn"
          onClick={handleRecovery}
          disabled={!recoveryAvailable}
        >
          <span className="btn-icon">🔄</span>
          <span className="btn-text">Use Recovery</span>
        </button>
      </div>
      
      <div className="tries-warning">
        {triesLeft === 1 && (
          <p className="warning-text">⚠️ Last try! Be careful!</p>
        )}
        {triesLeft === 2 && (
          <p className="warning-text">⚠️ 2 tries left</p>
        )}
        {triesLeft === 3 && (
          <p className="warning-text">⚠️ 3 tries available</p>
        )}
      </div>
      
      <div className="controls-info">
        <p>Press Enter to submit your answer</p>
      </div>
    </div>
  )
}

export default GameControls