import axios from "axios"

const service = axios.create({
    baseURL: process.env.BASE_API,
    timeout: 5000
});

//request拦截器，实现loading加载
service.interceptors.request.use(config => {
    return config
}, error => {
    Message({
        message: error.message,
        type: 'error',
        duration: 5*1000
    })
    return Promise.reject(error)
})

//response拦截器，实现loading关闭
service.interceptors.response.use(data => {
    return data
}, error => {
    Message({
        message: error.message,
        type: 'error',
        duration: 5*1000
    })
    return Promise.reject(error)
})
