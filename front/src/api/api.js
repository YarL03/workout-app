import axios from 'axios'

const instance = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
})

export const api = async ({url, type = 'GET', auth = true, body}) => {
    if (auth) {
        instance.defaults.headers.common['Authorization'] = localStorage.getItem('token')
    } 

    try {
        
    
        switch (type) {
            case 'GET': {
                const {data} = await instance.get(url)
                return data
            }
        
            case 'POST':{
                const {data} = await instance.post(url, body)
                return data
            }

            case 'PUT': {
                const {data} = await instance.put(url, body)
                return data
            }

            case 'DELETE': {
                const {data} = await instance.delete(url)
                return data
            }
        }
    }

    catch (error) {
        throw error.response && error.response.data
            ? error.response.data.message
            : error.message
    }
}