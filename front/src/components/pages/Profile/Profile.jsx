import bgImage from '../../../images/profile-bg.jpg'
import afterImage from '../../../images/after.jpg'
import userImage from '../../../images/header/user.svg'
import styles from './Profile.module.scss'
import stylesLayout from '../../common/Layout.module.scss'
import { useQuery } from "react-query"
import { api } from "../../../api/api"
import { Header } from "../../common/Header/Header"
import Counters from '../../ui/Counters/Counters'

const Profile = () => {
    const {data, isSuccess} = useQuery('Home page counters',
    () => api({url: '/users/profile'}),
    {
        refetchOnWindowFocus: false,
    }
    )
    

    return (
        <>
            
            <div
                className={`${stylesLayout.wrapper} ${stylesLayout.otherPage}`}
                style={{backgroundImage: `url(${bgImage})`}}
            >
                <Header/>
                <div className={styles.center}>
                    <img src={userImage} alt="Profile" height="56"/>
                    {isSuccess && <h1 className={stylesLayout.heading}>{data.email}</h1>}
                </div>
                {isSuccess && <Counters data={data} />}
            </div>
            <div className={styles.wrapper}>
                <div className={styles.beforeAfter}>
                    <div>
                        <div className={styles.heading}>Before</div>
                        <img src={afterImage} alt=""/>
                    </div>
                    <div>
                        <div className={styles.heading}>After</div>
                        <img src={afterImage} alt=""/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile