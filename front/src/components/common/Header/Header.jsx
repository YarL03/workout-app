import style from './Header.module.scss'

import userImage from '../../../images/header/user.svg'
import Hamburger from './Hamburger/Hamburger'

export const Header = () => {
    return (
        <header className={style.header}>
            <button type='button'>
                <img src={userImage} alt='Auth'/>
            </button>

            <Hamburger/>
        </header>
    )
}