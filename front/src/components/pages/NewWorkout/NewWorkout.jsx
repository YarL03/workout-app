import Layout from "../../common/Layout"
import bgImage from '../../../images/new-workout-bg.jpg'
import Field from "../../ui/Field/Field"
import { useForm } from "react-hook-form"
import Button from "../../ui/Button/Button"
import styles from './NewWorkout.module.scss'
import ReactSelect from 'react-select'
import { optionColor } from "./optionColor"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useMutation, useQuery } from "react-query"
import { api } from "../../../api/api"
import Alert from "../../ui/Alert/Alert"
import Loader from "../../ui/Loader/Loader"

const NewWorkout = () => {
    const {register, handleSubmit, reset, setError, clearErrors, formState: {errors}} = useForm()
    const [exercises, setExercises] = useState([])

    const {data, isSuccess: isSuccessGet} = useQuery('Get exercises',
    () => api({url: '/exercises'}),
    {   
        refetchOnWindowFocus: false
    }
    )

    const {isSuccess: isSuccessPost, mutate, isLoading, error: errorPost} = useMutation('Add new workout',
    (body) => api({url: '/workouts', type: 'POST', body}),
    {
        onSuccess(data) {
            reset()
            setExercises([])
        }
    }
    )


    const onSubmit = (data) => {
        if (!exercises.length) {
            setError('imposible-to-create', {type: 'custom', message: 'There are no exercises yet'})
            return
        }
        
        errors['imposible-to-create'] && clearErrors('imposible-to-create')

        mutate({...data, exercisesIds: exercises.map(item => item.value)})
    }

    return (
        <>
            <Layout bgImage={bgImage}>
                <h1>CREATE NEW WORKOUT</h1>
            </Layout>
             <div className={styles.wrapper}>
                {errorPost && <Alert type="error" text={errorPost}/>}
                {errors['imposible-to-create'] && <Alert type="error" text={errors['imposible-to-create'].message}/>}
                {isSuccessPost && <Alert text="Workout has been created"/>}
                {isLoading && <Loader/>}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Field
                        error={!!errors?.name}
                        register={register('name', {
                            required: true
                        })}
                        
                        placeholder="Enter name"
                    />
                    <div className={styles['link-wrapper']}>
                        <Link to="/new-exercise" className="dark-link">Add new exercise</Link>
                    </div>
                   {!!data?.length && isSuccessGet &&
                    <ReactSelect
                        classNamePrefix="select2-selection"
                        placeholder="Exercises..."
                        title="Exercises"
                        options={data.map(exercise => ({
                            label: exercise.name,
                            value: exercise._id
                        }))}
                        value={exercises}
                        onChange={setExercises}
                        theme={theme => optionColor(theme)}
                        isMulti={true}
                    />}
                    <Button
                        type="submit"
                        text="Create"
                        callback={() => {}}
                    />
                </form>
            </div>
        </>
    )
}

export default NewWorkout