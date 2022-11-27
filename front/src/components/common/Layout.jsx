import {Header} from './Header/Header'
import styles from './Layout.module.scss'
import cn from 'classnames'

const Layout = ({children, height = '280px', bgImage, backLink = -1}) => {
    return (
        <div className={cn(styles.wrapper, {[styles.otherPage]: height === '280px'})} style={{height, backgroundImage: `url(${bgImage})`}}>
            <Header backLink={backLink}/>
            <div>    
                {children}
            </div>
        </div>
    )
}

export default Layout