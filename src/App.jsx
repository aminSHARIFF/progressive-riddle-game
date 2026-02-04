import React, { useState, useEffect } from 'react'
import './App.css'
import ScoreBoard from './components/ScoreBoard'
import GameBoard from './components/GameBoard'
import GameControls from './components/GameControls'
import { riddles } from './data/riddles'

function App() {
  const [currentLevel, setCurrentLevel] = useState(1)
  const [score, setScore] = useState(100)
  const [gameStatus, setGameStatus] = useState('playing')
  const [hints, setHints] = useState(1) 
  const [recoveryAvailable, setRecoveryAvailable] = useState(true) 
  const [userAnswer, setUserAnswer] = useState('')
  const [feedback, setFeedback] = useState('')
  const [showHint, setShowHint] = useState(false)
  const [triesLeft, setTriesLeft] = useState(3)

  const currentRiddle = riddles.find(r => r.level === currentLevel)

  useEffect(() => {
    if (score <= 0) {
      setGameStatus('lost')
    } else if (currentLevel > riddles.length) {
      setGameStatus('won')
    }
  }, [score, currentLevel])

  useEffect(() => {
    // Reset tries when moving to next level
    setTriesLeft(3)
  }, [currentLevel])

  const handleAnswerSubmit = () => {
    if (!userAnswer.trim()) {
      setFeedback('Please enter an answer!')
      return
    }

    const correctAnswer = currentRiddle.answer.toLowerCase().trim()
    const userAnswerLower = userAnswer.toLowerCase().trim()

    if (userAnswerLower === correctAnswer) {
      setFeedback('Correct! Well done!')
      setScore(prev => prev + 20)
      
     
      setHints(prev => prev + 1)
      
      
      if (currentLevel % 3 === 0) {
        setRecoveryAvailable(true)
      }
      
      setTimeout(() => {
        setCurrentLevel(prev => prev + 1)
        setUserAnswer('')
        setFeedback('')
        setShowHint(false)
      }, 1500)
    } else {
      
      const newTriesLeft = triesLeft - 1
      setTriesLeft(newTriesLeft)
      
      if (newTriesLeft <= 0) {
        
        setGameStatus('lost')
        setFeedback('Game Over! You used all 3 tries!')
      } else {
        setScore(prev => Math.max(0, prev - 10))
        setFeedback(`Incorrect! ${newTriesLeft} ${newTriesLeft === 1 ? 'try' : 'tries'} remaining.`)
      }
    }
  }

  const handleHint = () => {
    console.log('Hint button clicked, available hints:', hints)
    if (hints > 0) {
      setShowHint(true)
      setHints(prev => prev - 1)
      setFeedback('Hint revealed! Check above the answer box.')
    } else {
      setFeedback('No hints available! Answer correctly to earn hints.')
    }
  }

  const handleRecovery = () => {
    console.log('Recovery button clicked, available:', recoveryAvailable)
    if (recoveryAvailable) {
      setScore(prev => prev + 30)
      setRecoveryAvailable(false)
      setFeedback('Recovery used! +30 points!')
      
      
      if (triesLeft <= 1) {
        setTriesLeft(3)
        setFeedback('Recovery used! +30 points and tries reset to 3!')
      }
    } else {
      setFeedback('No recovery available! Complete every 3rd level to earn recovery.')
    }
  }

  const handleReset = () => {
    setCurrentLevel(1)
    setScore(100)
    setGameStatus('playing')
    setHints(1) 
    setRecoveryAvailable(true) 
    setUserAnswer('')
    setFeedback('')
    setShowHint(false)
    setTriesLeft(3)
  }

  if (gameStatus === 'lost') {
    return (
      <div className="game-container">
        <div className="game-over">
          <h2>Game Over! ⏰</h2>
          <p>You used all 3 attempts!</p>
          <p>Final Score: {score}</p>
          <button className="reset-btn" onClick={handleReset}>
            Play Again
          </button>
        </div>
      </div>
    )
  }

  if (gameStatus === 'won') {
    return (
      <div className="game-container">
        <div className="game-won">
          <h2>Congratulations! 🎉</h2>
          <p>You solved all riddles!</p>
          <p>Final Score: {score}</p>
          <button className="reset-btn" onClick={handleReset}>
            Play Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="game-container">
      <ScoreBoard 
        score={score} 
        currentLevel={currentLevel} 
        totalLevels={riddles.length}
        hints={hints}
        recoveryAvailable={recoveryAvailable}
        triesLeft={triesLeft}
      />
      
      <GameBoard 
        riddle={currentRiddle}
        userAnswer={userAnswer}
        setUserAnswer={setUserAnswer}
        feedback={feedback}
        showHint={showHint}
        triesLeft={triesLeft}
        onSubmit={handleAnswerSubmit}
      />
      
      <GameControls 
        onHint={handleHint}
        onRecovery={handleRecovery}
        onSubmit={handleAnswerSubmit}
        hints={hints}
        recoveryAvailable={recoveryAvailable}
        triesLeft={triesLeft}
      />
    </div>
  )
}

export default App