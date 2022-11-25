import styles from './Field.module.scss'
import cn from 'classnames'

const Field = ({placeholder, type = 'text', register, error = false}) => {
    return (
        <input 
            {...register}
            placeholder={placeholder}
            type={type}
            className={cn(styles.input, {[styles.error]: !!error})}
            />
    )
}

export default Field