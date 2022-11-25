import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

const RequiredAuth = ({children}) => {
    const {isAuth} = useAuth()

    return (
        isAuth ? children : <Navigate to="/auth"/>
    )
}

export default RequiredAuth