import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { showMessage } from './statuscode'
import { ElMessage } from 'element-plus'

const instance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // 替换为你的 API 基础 URL
  timeout: 6000, // 设置请求超时时间
  withCredentials: false,
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么，例如添加 Token
    const token = localStorage.getItem('token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    // 处理请求错误
    return Promise.reject(error)
  },
)

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 对响应数据做些什么
    return response
  },
  (error) => {
    // 处理响应错误
    const { response } = error
    if (response) {
      // 服务器返回的错误码
      console.log(response.status)
      ElMessage({
        message: showMessage(response.status),
        type: 'warning',
      })
      showMessage(response.status)
    } else {
      console.log('Network or server error')
    }
    return Promise.reject(error)
  },
)

export default instance
