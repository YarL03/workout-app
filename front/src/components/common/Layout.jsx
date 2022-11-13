import {Header} from './Header/Header'
import style from './Layout.module.scss'

const Layout = ({children, height = '350px', bgImage}) => {
    return (
        <div className={style.wrapper} style={{height, backgroundImage: `url(${bgImage})`}}>
            <Header/>
            <div>    
                {children}
            </div>
        </div>
    )
}

export default Layout