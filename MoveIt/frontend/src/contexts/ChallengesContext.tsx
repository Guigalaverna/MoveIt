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

  function resetChallenge() {
    setActiveChallenge(null)
  }


  return (
    <ChallengesContext.Provider value={{ 
      level, 
      currentExperience, 
      challengesCompleted, 
      startNewChallenge, 
      activeChallenge, 
      resetChallenge, 
      experienceToNextLevel 
    }}>
      {children}
    </ChallengesContext.Provider>
  )
}