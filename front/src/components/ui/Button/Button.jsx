import styles from './Button.module.scss'

const Button = ({text, callback, styleName = 'purple'}) => {

    return (
        <div className={styles.wrapper}>
            <button className={`${styles.button} ${styles[styleName]}`} onClick={callback}>
                {text}
            </button>
        </div>
    )
}

export default Button