import { useState } from 'react'
import hamburgerImage from '../../../../images/header/hamburger.svg'
import hamburgerCloseImage from '../../../../images/header/hamburger-close.svg'
import styles from './Hamburger.module.scss'
import { Link } from 'react-router-dom'
import { menu } from './menuBase'
import { useAuth } from '../../../../hooks/useAuth'
import { useOutsideAlerter } from '../../../../hooks/useOutsideAlerter'


const Hamburger = () => {
    const {setIsAuth} = useAuth()
    const { ref, isComponentVisible, setIsComponentVisible} = useOutsideAlerter(false)
    const [show, setShow] = useState(false)

    const handleLogout = () => {
        localStorage.removeItem('token')
        setIsAuth(false)
        setIsComponentVisible(false)
    }

    return (
        <div className={styles.wrapper} ref={ref}>
            <button type='button' onClick={() => setIsComponentVisible(!isComponentVisible)}>
                <img 
                    src={isComponentVisible ? hamburgerCloseImage : hamburgerImage} 
                    alt='Menu'
                    height='24'/>
            </button>
            <nav className={`${styles.menu} ${isComponentVisible ? styles.show : ''}`}>
                <ul>
                    {
                        menu.map(item => (
                            <li key={'_key_' + item.title}>
                                <Link to={item.link}>{item.title}</Link>
                            </li>
                        ))
                    }
                    <li>
                        <a onClick={handleLogout}>Logout</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Hamburger