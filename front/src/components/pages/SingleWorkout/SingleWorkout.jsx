import cn from 'classnames'
import bgImage from '../../../images/workout-bg.jpg'
import styles from './SingleWorkout.module.scss'
import stylesLayout from '../../common/Layout.module.scss'
import { useMutation, useQuery } from "react-query"
import { api } from "../../../api/api"
import { Header } from "../../common/Header/Header"
import { useNavigate, useParams } from 'react-router-dom'
import Alert from '../../ui/Alert/Alert'
import Loader from '../../ui/Loader/Loader'
import { useEffect } from 'react'

const SingleWorkout = () => {
    const {id} = useParams()
    const navigate = useNavigate()

    const {data, isSuccess, isLoading, error: errorGet} = useQuery('Get workout',
    () => api({url: `/workouts/log/${id}`}),
    {
        refetchOnWindowFocus: false,
    }
    )

    const {mutate: setWorkoutCompleted, error: errorCompleted} = useMutation('Change log state',
    () => api({
        url: '/workouts/log/completed',
        type: 'PUT',
        body: {logId: id}
    }),
    {
        onSuccess(data) {
            navigate(`/workouts`)
        }
    }
    )

    useEffect(() => {
        if (
            isSuccess &&
            data?.exerciseLogs &&
            data.exerciseLogs.length ===
                data.exerciseLogs.filter(log => log.completed).length
        ) {
            setWorkoutCompleted()
        }
    }, [data?.exerciseLogs])

    
    console.log(isLoading, isSuccess, data)
    return (
        <>
            <div
                className={`${stylesLayout.wrapper} ${stylesLayout.otherPage}`}
                style={{backgroundImage: `url(${bgImage})`, height: 356}}
            >
                <Header backLink="/workouts"/>
                    {isSuccess && (
                        <div>
                            <time className={styles.time}>{data.minutes + ' min.'}</time>
                            <h1 className={stylesLayout.heading}>{data.workout.name}</h1>
                        </div>
                    )}
            </div>
            <div className={styles.wrapper}>
                {errorCompleted && <Alert type="error" text={errorCompleted}/>}
                {errorGet && <Alert type="error" text={errorGet}/>}
                {isLoading  && <Loader/>}
                {isSuccess && data && data.exerciseLogs.map((exerLog, id) => (
                    <button aria-label="Move to exercise" key={exerLog._id} className={cn({
                        [styles.finished]: exerLog.completed
                    })}
                    onClick={() => {
                        navigate(`/exercise/${exerLog._id}`)
                    }}
                    >
                            <span>{exerLog.exercise.name}</span>
                            <img src={`/uploads/exercises/${exerLog.exercise.imageName}.svg`} alt='' height='34'/>
                    </button>
                ))} 
                {isSuccess && data?.length === 0 && (
                    <Alert type='warning' text='Exercises not found' />
                )}
            </div>
        </>
    )
}

export default SingleWorkout