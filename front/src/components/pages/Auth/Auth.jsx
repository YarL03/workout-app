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

const Auth = () => {
    const {register, handleSubmit} = useForm()
    const [action, setAction] = useState('')

    const {mutate, isLoading, error} = useMutation('Registration',
    (body) => api({url: '/users', type: 'POST', auth: false, body}),
    {
        onSuccess(data) {
            localStorage.setItem('token', data.token)
        }
    }
    )

    const onSubmit = (data) => {
        switch (action) {
            case 'SIGN_IN':
                console.log(data, action)
                break
            case 'SIGN_UP':
                mutate(data)
                break
        }
    }

    return (
        <>
            <Layout bgImage={bgImage}>
                <h1>CREATE NEW WORKOUT</h1>
            </Layout>

            <div className={styles.wrapper}>
                {error && <Alert type="error" text={error}/>}
                {isLoading && <Loader/>}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Field
                        register={register('email', {
                            required: true
                        })}
                        // register={register}
                        // inputName="email"
                        placeholder="Enter email"
                    />
                    <Field
                        register={register('password', {
                            required: true
                        })}
                        // register={register}
                        // inputName="password"
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