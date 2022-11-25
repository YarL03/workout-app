import bgImage from '../../../images/workout-bg.jpg'
import styles from './Workouts.module.scss'
import { useQuery } from "react-query"
import { api } from "../../../api/api"
import Alert from '../../ui/Alert/Alert'
import Loader from '../../ui/Loader/Loader'
import Layout from '../../common/Layout'
import { Link } from 'react-router-dom'

const Workouts = () => {
    const {data, isSuccess, isLoading} = useQuery('Get workouts',
    () => api({url: `/workouts`}),
    {
        refetchOnWindowFocus: false,
    }
    )
    
    return (
        <>
            <Layout bgImage={bgImage}>
                <h1>WORKOUTS</h1>
            </Layout>
            <div className={styles.wrapper}>
                {isLoading ? <Loader/>
                : isSuccess ? data.map(work => (
                    <Link to={`/workouts/${work._id}`}>
                    <div key={work._id} className={styles.workout}>
                        
                            <span>{work.name}</span>
                       
                    </div>
                     </Link>
                )) 
                : <Alert type="warning" text="Workouts not found"/>}
            </div>
        </>
    )
}

export default Workouts