import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext'
import styles from '../styles/components/Countdown.module.css';

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {

    const {
        minutes,
        seconds,
        finalizou,
        isActive,
        comecarContagem,
        resetarContagem
    } = useContext(CountdownContext);

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    return (
        <div>
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

            {finalizou ? (
                <button
                    disabled
                    className={styles.countdownButton}
                >
                    Fim do ciclo!
                </button>
            ) : (
                <>
                    { isActive ? (
                        <button
                            type='button'
                            className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                            onClick={resetarContagem}
                        >
                            Abandonar ciclo
                        </button>
                    ) : (
                        <button
                            type='button'
                            className={styles.countdownButton}
                            onClick={comecarContagem}
                        >
                            Iniciar ciclo
                        </button>
                    )}
                </>
            )}
        </div>
    );
}