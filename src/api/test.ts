import axiosInstance from '@/utils/axios'
export const test = () => {
  return axiosInstance.get('api/test')
}
