import { useEffect, useState } from 'react'
import styles from './Countdown.module.css'

let countdownTimeout: NodeJS.Timeout

export default function Countdown() {
  const [time, setTime] = useState(25 * 60)

  const [isActive, setIsActive] = useState(false)

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('') 
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('') 

  function startCountdown() {
    setTime(25 * 60)
    setIsActive(true)
  }

  function stopCountdown() {
    setIsActive(false)
    clearTimeout(countdownTimeout)
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000) 
    }
  }, [isActive, time])

  return (
    <>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      { isActive ? (
        <button type='button' onClick={stopCountdown} className={styles.pauseCountdownButton}>Abandonar ciclo</button>
      ) : (
        <button type='button' onClick={startCountdown} className={styles.startCountdownButton}>Iniciar um ciclo</button>
      )}

    </>
  )
}