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

const NewWorkout = () => {
    const {register, handleSubmit} = useForm()
    const [exercises, setExercises] = useState([])

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <>
            <Layout bgImage={bgImage}>
                <h1>CREATE NEW WORKOUT</h1>
            </Layout>
             <div className={styles.wrapper}> {/* styles.wrapper */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Field
                        register={register}
                        inputName="name"
                        placeholder="Enter name"
                    />
                    <div className={styles['link-wrapper']}>
                        <Link to="/new-exercise" className="dark-link">Add new exercise</Link>
                    </div>
                    <ReactSelect
                        classNamePrefix="select2-selection"
                        placeholder="Exercises..."
                        title="Exercises"
                        options={[
                            {value: 'smth1', label: 'Push-ups'},
                            {value: 'smth2', label: 'Pull-ups'},
                        ]}
                        value={exercises}
                        onChange={setExercises}
                        theme={theme => optionColor(theme)}
                        isMulti={true}
                    />
                    <Button
                        text="Create"
                        callback={() => {}}
                    />
                </form>
            </div>
        </>
    )
}

export default NewWorkout