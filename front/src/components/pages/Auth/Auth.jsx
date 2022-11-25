import Layout from "../../common/Layout"
import bgImage from '../../../images/auth-bg.png'
import Field from "../../ui/Field/Field"
import { useForm } from "react-hook-form"
import Button from "../../ui/Button/Button"
import styles from './Auth.module.scss'
import { useState } from "react"
import Alert from "../../ui/Alert/Alert"
import { useMutation } from "react-query"
import { api } from "../../../api/api"
import Loader from "../../ui/Loader/Loader"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../../hooks/useAuth"

const Auth = () => {
    const {register, handleSubmit} = useForm()
    const [action, setAction] = useState('')

    const navigate = useNavigate()
    const {isAuth, setIsAuth} = useAuth()

    if (isAuth) navigate(-1)

    const successLogin = (token) => {
        localStorage.setItem('token', token)
        setIsAuth(true)
        navigate('/')
    }

    const {mutate: reg, isLoading: isLoadingReg, error: errorReg} = useMutation('Registration',
    (body) => api({url: '/users', type: 'POST', auth: false, body}),
    {
        onSuccess(data) {
            successLogin(data.token)
        }
    }
    )

    const {mutate: auth, isLoading: isLoadingAuth, error: errorAuth} = useMutation('Auth',
    (body) => api({url: '/users/login', type: 'POST', auth: false, body}),
    {
        onSuccess(data) {
            successLogin(data.token)
        }
    }
    )

    const onSubmit = (data) => {
        switch (action) {
            case 'SIGN_IN':
                auth(data)
                return
            case 'SIGN_UP':
                reg(data)
                return
        }
    }

    return (
        <>
            <Layout bgImage={bgImage}>
                <h1>CREATE NEW WORKOUT</h1>
            </Layout>

            <div className={styles.wrapper}>
                {(errorReg || errorAuth) && <Alert type="error" text={errorReg || errorAuth}/>}
                {(isLoadingReg || isLoadingAuth) && <Loader/>}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Field
                        register={register('email', {
                            required: true
                        })}
                        placeholder="Enter email"
                    />
                    <Field
                        register={register('password', {
                            required: true
                        })}
                        placeholder="Enter password"
                    />
                    <div className={styles['inline-buttons']}>
                        <Button
                            type="submit"
                            text="Sign in"
                            callback={() => {setAction('SIGN_IN')}}
                        />
                        <Button
                            type="submit"
                            text="Sign up"
                            callback={() => {setAction('SIGN_UP')}}
                        />
                    </div>
                </form>
            </div>
        </>
    )
}

export default Auth