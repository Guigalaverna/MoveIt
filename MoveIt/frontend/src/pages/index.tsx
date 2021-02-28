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

export default function Home() {
  return (
    <ChallengesProvider>
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
