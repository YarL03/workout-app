import styles from './Field.module.scss'

const Field = ({placeholder, type = 'text', register}) => {

    return (
        <input 
            {...register}
            placeholder={placeholder}
            type={type}
            className={styles.input}
            />
    )
}

export default Field