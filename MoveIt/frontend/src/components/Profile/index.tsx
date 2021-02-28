import styles from './Profile.module.css'

export default function Profile() {
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/Guigalaverna.png" alt="Guilherme Galaverna"/>
      <div>
        <strong>Guilherme Galaverna</strong>
        <p>
          <img src="icons/level.svg" alt="Level"/>
          Level 1
        </p>  
      </div>
    </div>
  )
}