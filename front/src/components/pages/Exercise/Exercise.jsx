import bgImage1 from '../../../images/ex-bg-1.jpg'
import checkCompletedImage from '../../../images/exercises/check-completed.svg'
import checkImage from '../../../images/exercises/check.svg'
import bgImage2 from '../../../images/ex-bg-2.jpg'
import styles from './Exercise.module.scss'
import stylesLayout from '../../common/Layout.module.scss'
import { useMutation, useQuery } from "react-query"
import { api } from "../../../api/api"
import { Header } from "../../common/Header/Header"
import { useNavigate, useParams } from 'react-router-dom'
import Alert from '../../ui/Alert/Alert'
import Loader from '../../ui/Loader/Loader'
import { getRandomInt } from '../../../utils/randomNumber'
import cn from 'classnames'
import { useState } from 'react'
import { useEffect } from 'react'
import debounce from 'lodash.debounce'

const Exercise = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [bgImage, setBgImage] = useState(bgImage1)

    const {data, isSuccess, isLoading, error, refetch} = useQuery('Get exercise log',
    () => api({url: `/exercises/log/${id}`}),
    {
        refetchOnWindowFocus: false,
    }
    )

    const {mutate: setExCompleted, isLoading: isLoadingCompleted, error: errorCompleted} = useMutation('setExCompleted',
    () => api({
        url: '/exercises/log/completed',
        type: 'PUT',
        body: { logId: id, completed: true}}),
    {
        onSuccess(data) {
          navigate(`/workouts/${data.workoutLog}`) 
        }
    }
    )

    const {mutate, isLoading: isLoadingMutate, error: errorMutate} = useMutation('/exercises/log PUT',
    ({ timeIndex, key, value }) => api({
        url: '/exercises/log',
        type: 'PUT',
        body: {logId: id, timeIndex, key, value}}),
    {
        onSuccess(data) {
          refetch()  
        }
    }
    )

    useEffect(() => {
        setBgImage(getRandomInt(1,2) === 1 ? bgImage1 : bgImage2)
    }, [])

    useEffect(() => {
        
            if (
                isSuccess &&
                data.times.length === data.times.filter(time => time.completed)
                .length
                ) {
                    setExCompleted()
            }

        }, [data?.times, isSuccess])

    !isSuccess && error && setTimeout(() => navigate('/workouts'), 1500)
    return (
        <>
            <div
                className={`${stylesLayout.wrapper} ${stylesLayout.otherPage}`}
                style={{backgroundImage: `url(${bgImage})`, height: 356}}
            >   
                
                <Header backLink={isSuccess ? `/workouts/${data.workoutLog}` : '/workouts'}/>
                    {isSuccess && (
                        <div className={styles.heading}>
                            <img src={`/uploads/exercises/${data.exercise.imageName}.svg`} alt='' height='34'/>
                            <h1 className={stylesLayout.heading}>{data.exercise.name}</h1>
                        </div>
                    )}
            </div>
            {errorMutate && <div style={{width: '90%', margin: '15px auto 0',}}>
                    <Alert type="error" text={errorMutate}/>
                </div>
            }
            <div className={styles.wrapper}>
                
                {!isSuccess && error && <Alert type="warning" text="Exercise not found"/>}
                
                    
                <div className={styles.row}>
                    <div>
                        <span>
                            Previous
                         </span>
                     </div>
                    <div>
                        <span>
                             Repeat & Weight
                        </span>
                    </div>
                    <div>
                        <span>
                            Completed
                        </span>
                    </div>
                </div>
                {isLoading && <Loader/>}
                {isSuccess && data.times.map((item, idx) => (
                  <div className={cn(styles.row, {
                    [styles.completed]: item.completed
                  })} key={`time ${item._id}`}>
                    <div className={styles.opacity}>
                        <input type="number" value={item.prevWeight} disabled/>
                        <i>kg/</i>
                        <input type="number" value={item.prevRepeat} disabled/>
                    </div>

                    <div>
                        <input type="tel" defaultValue={item.weight}
                        onChange={debounce((e) => mutate({
                            timeIndex: idx,
                            key: 'weight',
                            value: e.target.value
                        }), 1000)}
                        />
                        <i>kg/</i>
                        <input type="tel" defaultValue={item.repeat}
                        onChange={debounce((e) => mutate({
                            timeIndex: idx,
                            key: 'repeat',
                            value: e.target.value
                        }), 1000)}
                        />
                    </div>

                    <div>
                        <img 
                            className={styles.checkbox}
                            src={item.completed ? checkCompletedImage : checkImage}
                            alt=""
                            onClick={() => mutate({
                                timeIndex: idx,
                                key: 'completed',
                                value: !item.completed
                            })}
                            />
                    </div>
                  </div>  
                ))}      
                        
            </div>
        </>
    )
}

export default Exercise