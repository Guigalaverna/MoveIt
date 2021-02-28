import { useContext } from 'react'
import { CountdownContext } from '../../contexts'
import styles from './Countdown.module.css'

export default function Countdown() {

  const { 
    minutes, 
    seconds, 
    hasFinished, 
    isActive, 
    resetCountdown, 
    startCountdown 
  } = useContext(CountdownContext)


  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('') 
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')  

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
      { hasFinished ? (
        <button 
          disabled 
          type='button' 
          style={{ cursor: 'not-allowed' }} 
          className={styles.countdownEnded}>
            Ciclo encerrado 
            <img 
              style={{ marginLeft: '0.5rem' }} 
              src="icons/check_circle.svg" 
              alt="Ciclo encerrado"
            />
          </button>
      ) : (
        <>
          { isActive ? (
            <button 
              type='button' 
              onClick={resetCountdown} 
              className={styles.pauseCountdownButton}>
                Abandonar ciclo
            </button>
          ) : (
            <button 
              type='button' 
              onClick={startCountdown} 
              className={styles.startCountdownButton}>
                Iniciar um ciclo
              </button>
          )}
        </>
      )}

      

    </>
  )
}