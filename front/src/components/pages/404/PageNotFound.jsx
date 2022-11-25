import Layout from "../../common/Layout"
import bgImage from '../../../images/auth-bg.png'
import styles from './PageNotFound.module.scss'

const PageNotFound = () => {

    return (
        <>
            <Layout bgImage={bgImage}>
                <h1>PAGE NOT FOUND</h1>
            </Layout>

            <div className={styles.wrapper}>
                404 page not found               
            </div>
        </>
    )
}

export default PageNotFound