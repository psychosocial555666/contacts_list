import axios, { AxiosResponse, AxiosError } from 'axios'
import cogoToast from 'cogo-toast'

export const createAPI = () => {
  const api = axios.create({
    baseURL: `http://localhost:3000/`,
    timeout: 15000,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  })

  const onSuccess = (response: AxiosResponse) => {
    if (response?.status === 201) {
      cogoToast.success('Создание прошло успешно', { position: 'bottom-right' })
    }
    if (response?.status === 204) {
      cogoToast.success('Изменение данных прошло успешно', {
        position: 'bottom-right',
      })
    }
    return response
  }

  const onFail = (err: AxiosError) => {
    if (err?.response?.status === 400) {
      cogoToast.error(
        'Ошибка, попробуйте повторить запрос или обратитесь в поддержку',
        { position: 'bottom-right' },
      )
    }
    if (err?.response?.status === 403) {
      cogoToast.error('Нет доступа к ресурсу', { position: 'bottom-right' })
    }
    if (err?.response?.status === 404) {
      cogoToast.error('Информация не найдена', { position: 'bottom-right' })
    }
    if (err?.response?.status === 422) {
      cogoToast.error('Ошибка данных клиента', { position: 'bottom-right' })
    }
    if (err?.response?.status === 500) {
      cogoToast.error('Ошибка на стороне сервера, обратитесь в поддержку', {
        position: 'bottom-right',
      })
    }
    throw err
  }

  api.interceptors.response.use(onSuccess, onFail)

  return api
}
