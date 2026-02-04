import React from 'react'

const ScoreBoard = ({ score, currentLevel, totalLevels, hints, recoveryAvailable }) => {
  return (
    <div className="score-board">
      <div className="score-info">
        <div className="score-item">
          <span className="score-label">Score:</span>
          <span className="score-value">{score}</span>
        </div>
        <div className="score-item">
          <span className="score-label">Level:</span>
          <span className="score-value">{currentLevel}/{totalLevels}</span>
        </div>
      </div>

      <div className="resources">
        <div className="resource-item">
          <span className="resource-label">Hints:</span>
          <span className={`resource-value ${hints > 0 ? 'available' : 'unavailable'}`}>
            {hints}
          </span>
        </div>
        <div className="resource-item">
          <span className="resource-label">Recovery:</span>
          <span className={`resource-value ${recoveryAvailable ? 'available' : 'unavailable'}`}>
            {recoveryAvailable ? 'Available' : 'None'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ScoreBoard
