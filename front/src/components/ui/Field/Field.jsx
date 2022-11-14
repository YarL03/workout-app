import styles from './Field.module.scss'

const Field = ({placeholder, register, inputName, type = 'text'}) => {

    return (
        <input 
            {...register(inputName)}
            placeholder={placeholder}
            type={type}
            className={styles.input}
            />
    )
}

export default Field