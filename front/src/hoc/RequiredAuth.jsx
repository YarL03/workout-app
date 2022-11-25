import PageNotFound from "../components/pages/404/PageNotFound"
import { useAuth } from "../hooks/useAuth"

const RequiredAuth = ({children}) => {
    const {isAuth} = useAuth()

    return (
        isAuth ? children : <PageNotFound/>
    )
}

export default RequiredAuth