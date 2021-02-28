import { createContext, useState } from "react";

import challenges from '../../challenges.json'

interface ChallengesProviderData {
  children: React.ReactNode
}

interface ChallengesContext {
  level: number
  currentExperience: number
  challengesCompleted: number
  activeChallenge: null | {
    type: 'body' | 'eye'
    description: String
    amount: Number
  }
  experienceToNextLevel: number

  startNewChallenge: () => void
  resetChallenge: () => void
  completeChallenge: () => void
}


export const ChallengesContext = createContext({} as ChallengesContext)

export default function ChallengesProvider({ children }: ChallengesProviderData) {
  const [level, setLevel] = useState(1)
  const [currentExperience, setCurrentExperience] = useState(0)
  const [challengesCompleted, setChallengesCompleted] = useState(0)
  const [activeChallenge, setActiveChallenge] = useState(null)

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  function startNewChallenge() {
    const randomNewChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomNewChallengeIndex]

    setActiveChallenge(challenge)
  }

  function levelUp() {
    setLevel(level + 1)
  }

  function resetChallenge() {
    setActiveChallenge(null)
  }

  function completeChallenge() {
    if(!activeChallenge) return

    const { amount } = activeChallenge

    let finalExperience = currentExperience + amount

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel      
      levelUp()
    }

    setCurrentExperience(finalExperience)
    setActiveChallenge(null)
    setChallengesCompleted(challengesCompleted + 1)
  }


  return (
    <ChallengesContext.Provider value={{ 
      level, 
      currentExperience, 
      challengesCompleted, 
      startNewChallenge, 
      activeChallenge, 
      resetChallenge, 
      experienceToNextLevel,
      completeChallenge
    }}>
      {children}
    </ChallengesContext.Provider>
  )
}