import cn from 'classnames'
import Layout from "../../common/Layout"
import bgImage from '../../../images/new-exercise-bg.jpg'
import Field from "../../ui/Field/Field"
import { useForm } from "react-hook-form"
import Button from "../../ui/Button/Button"
import styles from './NewExercise.module.scss'
import { useState } from "react"
import { useMutation } from 'react-query'
import { api } from '../../../api/api'
import Loader from '../../ui/Loader/Loader'
import Alert from '../../ui/Alert/Alert'

const data = ['chest', 'shoulders', 'biceps', 'legs', 'hit']

const NewExercise = () => {
    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        defaultValues: {times: 3}
    })
    const [imageName, setImageName] = useState('chest')

    const {isSuccess, mutate, isLoading, error} = useMutation('Create new exercise',
    (body) => api({url: '/exercises', type: 'POST', body}),
    {
        onSuccess(data) {
            reset()
            imageName !== 'chest' && setImageName('chest')
        }
    }
    )

    const onSubmit = (data) => {
        mutate({...data, imageName})
    }

    return (
        <>
            <Layout bgImage={bgImage}>
                <h1>CREATE NEW EXERCISE</h1>
            </Layout>
             <div className={styles.wrapper}>
                {error && <Alert type='error' text={error}/>}
                {isSuccess && <Alert text={'Exercise has been created'}/>}
                {isLoading && <Loader/>}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Field
                        error={!!errors?.name}
                        register={register('name', {
                            required: 'This field is required'
                        })}
                        placeholder={errors?.name?.message || "Enter name"}
                    />
                    <Field
                        error={!!errors?.times}
                        register={register('times', {
                            required: 'This field is required',
                        })}
                        placeholder="Enter times"
                    />

                    <div className={styles.images}>
                        {data.map(name => (
                            <img key={'__key__' + name} src={`/uploads/exercises/${name}.svg`} alt={name}
                            className={cn({
                                [styles.active]: imageName === name
                            })}
                            onClick={() => setImageName(name)}
                            />
                        ))}
                    </div>
                    <Button
                        type='submit'
                        text="Create"
                        callback={() => {}}
                    />
                </form>
            </div>
        </>
    )
}

export default NewExercise