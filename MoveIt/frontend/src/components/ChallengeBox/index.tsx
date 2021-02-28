import styles from './ChallengeBox.module.css'

export default function ChallengeBox() {

  const hasFinished = true

  return (
    <div className={styles.challengeBoxContainer}>
      { hasFinished 
      ? (
        <div className={styles.challengeActive}>
          <header>Ganhe 400 xp</header>
          <main>
            <img src="icons/body.svg" alt=""/>
            <strong>Novo desafio</strong>
            <p>Levando e faça uma caminha de três minutos</p>
          </main>
          <footer>
            <button
              type='button'
              className={styles.failedButton}
            >Falhei</button>
            <button
              type='button'
              className={styles.succeededButton}
            >Completei</button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>Finalize um ciclo para receber um desafio</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level Up"/>
            Avance de level completando desafios
          </p>
        </div>
      )
      }
    </div>
  )
}