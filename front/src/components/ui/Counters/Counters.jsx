import styles from './Counters.module.scss'

const Counters = ({data: {minutes = 0, workouts = 0, kgs = 0}}) => {
    return (
        <div className={styles.wrapper}>
                    <div className={styles.counter}>
                        <div className={styles.heading}>minutes</div>
                        <div className={styles.number}>{minutes}</div>
                    </div>
                    <div className={styles.counter}>
                        <div className={styles.heading}>workouts</div>
                        <div className={styles.number}>{workouts}</div>
                    </div>
                    <div className={styles.counter}>
                        <div className={styles.heading}>kgs</div>
                        <div className={styles.number}>{kgs}</div>
                    </div>
        </div>
    )
}

export default Counters