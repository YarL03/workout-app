import bgImage from '../../../images/workout-bg.jpg'
import styles from './SingleWorkout.module.scss'
import stylesLayout from '../../common/Layout.module.scss'
import { useQuery } from "react-query"
import { api } from "../../../api/api"
import { Header } from "../../common/Header/Header"
import { useParams } from 'react-router-dom'
import Alert from '../../ui/Alert/Alert'
import Loader from '../../ui/Loader/Loader'

const SingleWorkout = () => {
    const {id} = useParams()

    const {data, isSuccess, isLoading} = useQuery('Get workout',
    () => api({url: `/workouts/${id}`}),
    {
        refetchOnWindowFocus: false,
    }
    )
    
    console.log(isLoading, isSuccess, data)
    return (
        <>
            <div
                className={`${stylesLayout.wrapper} ${stylesLayout.otherPage}`}
                style={{backgroundImage: `url(${bgImage})`, height: 356}}
            >
                <Header/>
                    {isSuccess && (
                        <div>
                            <time className={styles.time}>{data.minutes + ' min.'}</time>
                            <h1 className={stylesLayout.heading}>{data.name}</h1>
                        </div>
                    )}
            </div>
            <div className={styles.wrapper}>
                {isLoading ? <Loader/>
                : isSuccess ? data.exercises.map((exer, id) => (
                    <div key={exer._id} className={styles.exercise}>
                        <span>{exer.name}</span>
                        <img src={`/uploads/exercises/${exer.imageName}.svg`} alt='' height='34'/>
                    </div>
                )) 
                : <Alert type="warning" text="Exercises not found"/>}
            </div>
        </>
    )
}

export default SingleWorkout