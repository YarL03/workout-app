import { useState } from 'react'
import hamburgerImage from '../../../../images/header/hamburger.svg'
import hamburgerCloseImage from '../../../../images/header/hamburger-close.svg'
import styles from './Hamburger.module.scss'
import { Link } from 'react-router-dom'
import { menu } from './menuBase'


const Hamburger = () => {
    const [show, setShow] = useState(false)

    const handleLogout = () => console.log('Logout')

    return (
        <div className={styles.wrapper}>
            <button type='button' onClick={() => setShow(!show)}>
                <img src={show ? hamburgerCloseImage : hamburgerImage} alt='Auth'/>
            </button>
            <nav className={`${styles.menu} ${show ? styles.show : ''}`}>
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