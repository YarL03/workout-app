import style from './Header.module.scss'
import arrowImage from '../../../images/header/arrow.svg'
import userImage from '../../../images/header/user.svg'
import authImage from '../../../images/header/dumbbell.svg'

import Hamburger from './Hamburger/Hamburger'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'


export const Header = ({backLink = -1}) => {
    const location = useLocation()
    const navigate = useNavigate()

    const {isAuth} = useAuth()

    const goBack = () => navigate(backLink)
    const goAuth = () => isAuth ? navigate('/profile') : navigate('/auth')

    return (
        
        <header className={style.header}>
            {
            location.pathname !== '/' ?
            <button type='button' onClick={goBack}>
                <img src={arrowImage} alt='Auth'/>
            </button>
            :  <button type='button' onClick={goAuth}>
                <img src={isAuth ? authImage : userImage} alt='Auth'/>
            </button>
            }
           
            <Hamburger/>
        </header>
    )
}