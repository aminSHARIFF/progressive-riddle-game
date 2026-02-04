import React from 'react'

const GameControls = ({ onHint, onRecovery, onSubmit, hints, recoveryAvailable, triesLeft }) => {
  
  const handleHintClick = (e) => {
    e.preventDefault();
    console.log('Hint button clicked');
    onHint();
  }

  const handleRecoveryClick = (e) => {
    e.preventDefault();
    console.log('Recovery button clicked');
    onRecovery();
  }

  const handleSubmitClick = (e) => {
    e.preventDefault();
    console.log('Submit button clicked');
    onSubmit();
  }

  return (
    <div className="game-controls">
      <div className="controls-row">
        <button 
          className="control-btn hint-btn"
          onClick={handleHintClick}
          disabled={hints === 0}
        >
           Hint ({hints})
        </button>
        
        <button 
          className="control-btn submit-btn"
          onClick={handleSubmitClick}
        >
           Submit
        </button>
        
        <button 
          className="control-btn recovery-btn"
          onClick={handleRecoveryClick}
          disabled={!recoveryAvailable}
        >
           Recovery
        </button>
      </div>
      
      <div className="tries-warning">
        {triesLeft === 1 && (
          <p className="warning-text">Last try!</p>
        )}
        {triesLeft === 2 && (
          <p className="warning-text"> 2 tries left</p>
        )}
        {triesLeft === 3 && (
          <p className="warning-text"> 3 tries available</p>
        )}
      </div>
      
      <div className="controls-info">
        <p>Press Enter to submit answer</p>
      </div>
    </div>
  )
}

export default GameControls