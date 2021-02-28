import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from ".";

interface CountdownContextData {
  minutes: Number
  seconds: Number
  hasFinished: Boolean
  isActive: Boolean
  startCountdown: () => void
  resetCountdown: () => void
}

interface CountdownProviderProps {
  children: ReactNode
}

let countdownTimeout: NodeJS.Timeout

export const CountdownContext = createContext({} as CountdownContextData)

export default function CountdownProvider({ 
  children 
}: CountdownProviderProps) {
  const [time, setTime] = useState(0.1 * 60)

  const [isActive, setIsActive] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)

  const { startNewChallenge } = useContext(ChallengesContext)

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  function startCountdown() {
    setTime(0.1 * 60)
    setIsActive(true)
  }

  function resetCountdown() {
    setIsActive(false)
    clearTimeout(countdownTimeout)
    setHasFinished(false)
    setTime(0.1 * 60)
  }
  

  
  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000) 
    } else if (isActive && time <= 0) {
      setIsActive(false)
      setHasFinished(true)
      startNewChallenge()
    }
  }, [isActive, time])

  return (
    <CountdownContext.Provider value={{
      minutes,
      seconds,
      hasFinished,
      isActive,
      startCountdown,
      resetCountdown
    }}>
      {children}
    </CountdownContext.Provider>
  )
}