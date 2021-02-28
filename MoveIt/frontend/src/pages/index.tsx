import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { 
  ChallengeBox, 
  CompletedChallenges, 
  Countdown, 
  ExperienceBar,
  Profile 
} from '../components'
import { ChallengesProvider, CountdownProvider } from '../contexts/'

import styles from '../styles/Home.module.css'

interface HomeProps {
  level: number
  currentExperience: number
  challengesCompleted: number
}

export default function Home({ level, currentExperience, challengesCompleted }: HomeProps) {
  return (
    <ChallengesProvider 
      level={level} 
      currentExperience={currentExperience} 
      challengesCompleted={challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Início | MoveIt</title>
        </Head>
        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
                <Profile />
                <CompletedChallenges />
                <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { level, currentExperience, challengesCompleted } = ctx.req.cookies

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}