import bgImage from '../../../images/workout-bg.jpg'
import styles from './Workouts.module.scss'
import { useMutation, useQuery } from "react-query"
import { api } from "../../../api/api"
import Alert from '../../ui/Alert/Alert'
import Loader from '../../ui/Loader/Loader'
import Layout from '../../common/Layout'
import { Link, useNavigate } from 'react-router-dom'

const Workouts = () => {
    const navigate = useNavigate()

    const {data, isSuccess, isLoading} = useQuery('Get workouts',
    () => api({url: `/workouts`}),
    {
        refetchOnWindowFocus: false,
    }
    )

    const {mutate, isLoading: isLoadingMutate, isSuccess: isSuccessMutate, error} = useMutation(
        'Create new workout log',
        ({workoutId}) => api({url: '/workouts/log', type: 'POST', body: {workoutId}}),
        {
            onSuccess(data) {
                navigate(`/workouts/${data._id}`)
            }
        }
    )
    
    return (
        <>
            <Layout backLink="/" bgImage={bgImage}>
                <h1>WORKOUTS</h1>
            </Layout>
            <div className={styles.wrapper}>
                {isLoading && <Loader/>}
                {isSuccess && !!data.length && data.map(work => (
                    
                    <div key={work._id} className={styles.workout}>
                        <button
                            aria-label='Create new workout log'
                            onClick={() => mutate({workoutId: work._id})}
                        >
                            <span>{work.name}</span>
                       </button>
                    </div>
                     
                )) }
                {isSuccess && !data.length && <Alert type="warning" text="Workouts not found"/>}
            </div>
        </>
    )
}

export default Workouts