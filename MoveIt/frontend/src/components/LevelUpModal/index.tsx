import { useContext } from 'react'
import { ChallengesContext } from '../../contexts'
import styles from './LevelUpModal.module.css'

export default function LevelUpModal() {

  const { level, closeModal } = useContext(ChallengesContext)

  return (
    <div className={styles.levelUpModalOverlay}>
      <div className={styles.levelUpModalContainer}>
        <header>{level}</header>

        <strong>Parabéns</strong>
        <p>Você alcançou um novo level.</p>

        <button type='button' onClick={closeModal}><img src="icons/close.svg" alt="Fechar Modal"/></button>
      </div>
    </div>
  )
}