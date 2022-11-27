import Layout from "../../common/Layout"
import Button from "../../ui/Button/Button"
import Counters from "../../ui/Counters/Counters"
import bgImage from '../../../images/sm1.jpg'
import styles from './Home.module.scss'
import { useQuery } from "react-query"
import { api } from "../../../api/api"
import { useAuth } from "../../../hooks/useAuth"
import { useNavigate } from "react-router-dom"

const Home = () => {
    const navigate = useNavigate()
    const {isAuth} = useAuth()

    const {data, isSuccess} = useQuery('Home page counters',
    () => api({url: '/users/profile'}),
    {
        refetchOnWindowFocus: false,
        enabled: isAuth
    }
    )

    return (
        <Layout height="100%" bgImage={bgImage}>
            <Button text="New" styleName="main" callback={() => navigate('/new-workout')}/>
            <h1 className={styles.heading}>WORKOUTS APP</h1>
            {isSuccess && isAuth && <Counters data={data} />}
        </Layout>
    )
}

export default Home