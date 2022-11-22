import styles from './Button.module.scss'

const Button = ({text, callback, styleName = 'purple', type = 'button'}) => {

    return (
        <div className={styles.wrapper}>
            <button type={type}  className={`${styles.button} ${styles[styleName]}`} onClick={callback}>
                {text}
            </button>
        </div>
    )
}

export default Button