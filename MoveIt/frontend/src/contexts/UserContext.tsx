import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import Cookies from 'js-cookie'
import { ChallengesContext } from "."

interface UserContextData {
  user: null | User
  
  logIn: (name: String, avatar: String, level: number, currentExperience: number) => void
  logOut: () => void
}

interface UserProviderProps {
  children: ReactNode
}

interface User {
  name: string
  avatar: string
  level: number | 0
  currentExperience: number | 0
  awards: null | Awards
}

interface Awards {
  id: number
  name: string
  type: 'body' | 'eye'
  amount: number
  description: string
}

export const UserContext = createContext({} as UserContextData)

export default function UserProvider({ children }: UserProviderProps) {

  const [user, setUser] = useState<null | User>(null)

  // const { challengesCompleted, level, currentExperience } = useContext(ChallengesContext)

  const cookies = useEffect(() => {

  }, [])

  function logIn(name: string, avatar: string) {

    const level = Cookies.get('level')
    const currentExperience = Cookies.get('currentExperience')
    // const completedChallenge = Cookies.get('completedChallenges')

    setUser({
      name,
      level: Number(level),
      currentExperience: Number(currentExperience),
      avatar,
      awards: null
    })
  }

  function logOut() {
    setUser(null)
  }

  return (
    <UserContext.Provider value={{ user, logIn, logOut }}>
      {children}
    </UserContext.Provider>
  )
}