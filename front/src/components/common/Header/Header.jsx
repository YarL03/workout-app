import style from './Header.module.scss'
import arrowImage from '../../../images/header/arrow.svg'
import userImage from '../../../images/header/user.svg'

import Hamburger from './Hamburger/Hamburger'
import { useLocation, useNavigate } from 'react-router-dom'


export const Header = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const goBack = () => navigate(-1)
    const goAuth = () => navigate('/auth')

    return (
        
        <header className={style.header}>
            {
            location.pathname !== '/' ?
            <button type='button' onClick={goBack}>
                <img src={arrowImage} alt='Auth'/>
            </button>
            :  <button type='button' onClick={goAuth}>
                <img src={userImage} alt='Auth'/>
            </button>
            }
           

            <Hamburger/>
        </header>
    )
}