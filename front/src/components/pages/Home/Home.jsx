import Layout from "../../common/Layout"
import Button from "../../ui/Button/Button"
import Counters from "../../ui/Counters/Counters"
import bgImage from '../../../images/home-bg.jpg'
import styles from './Home.module.scss'
import { useQuery } from "react-query"
import { api } from "../../../api/api"
import { useAuth } from "../../../hooks/useAuth"

const Home = () => {
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
            <Button text="New" styleName="main" callback={() => console.log('click')}/>
            <h1 className={styles.heading}>EXERCISES FOR THE SHOULDERS</h1>
            {isSuccess && isAuth && <Counters data={data} />}
        </Layout>
    )
}

export default Home