import styles from './Profile.module.css'

interface ProfileData {
  name: string,
  avatar: string
  level: number
}


export default function Profile({ name, avatar, level }: ProfileData) {
  return (
    <div className={styles.profileContainer}>
      <img src={avatar} alt={name} />
      <div>
        <strong>{name}</strong>
        <p>
          <img src="icons/level.svg" alt="Level"/>
          Level {level}
        </p>  
      </div>
    </div>
  )
}