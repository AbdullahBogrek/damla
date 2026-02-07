import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_ENDPOINT

const api = axios.create({
  baseURL: BASE_URL,
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access-token')
    if (token) {
      config.headers.authorization = token
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/auth/login') &&
      !originalRequest.url.includes('/auth/refresh_token')
    ) {
      originalRequest._retry = true

      try {
        const refreshToken = localStorage.getItem('refresh-token')
        if (!refreshToken) {
          throw new Error('No refresh token')
        }

        const { data } = await axios.post(`${BASE_URL}/auth/refresh_token`, {
          refresh_token: refreshToken,
        })

        localStorage.setItem('access-token', data.accessToken)
        localStorage.setItem('refresh-token', data.refreshToken)

        originalRequest.headers.authorization = data.accessToken
        return api(originalRequest)
      } catch (refreshError) {
        localStorage.removeItem('access-token')
        localStorage.removeItem('refresh-token')
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

// Auth
export const fetchRegister = async (input) => {
  const { data } = await api.post('/auth/register', input)
  return data
}

export const fetchLogin = async (input) => {
  const { data } = await api.post('/auth/login', input)
  return data
}

export const fetchMe = async () => {
  const { data } = await api.get('/auth/me')
  return data
}

export const fetchLogout = async () => {
  const { data } = await api.post('/auth/logout', {
    refresh_token: localStorage.getItem('refresh-token'),
  })
  return data
}

export const fetchUserList = async () => {
  const { data } = await api.get('/auth')
  return data
}

export const fetchUser = async (id) => {
  const { data } = await api.get(`/auth/me/${id}`)
  return data
}

export const updateUser = async (id, input) => {
  const { data } = await api.put(`/auth/${id}`, input)
  return data
}

export const updatePassword = async (id, input) => {
  const { data } = await api.put(`/auth/password/${id}`, input)
  return data
}

export const deleteUser = async (id) => {
  const { data } = await api.delete(`/auth/${id}`)
  return data
}

// Help
export const fetchHelpList = async () => {
  const { data } = await api.get('/help')
  return data
}

export const fetchHelp = async (id) => {
  const { data } = await api.get(`/help/${id}`)
  return data
}

export const postHelps = async (input) => {
  const { data } = await api.post('/help/', input)
  return data
}

// Talep
export const fetchTalepList = async () => {
  const { data } = await api.get('/talep')
  return data
}

export const fetchTalep = async (id) => {
  const { data } = await api.get(`/talep/${id}`)
  return data
}

export const postTalep = async (input) => {
  const { data } = await api.post('/talep/', input)
  return data
}

export const deleteTalep = async (id) => {
  const { data } = await api.delete(`/talep/${id}`)
  return data
}

// Imkan
export const fetchImkanList = async () => {
  const { data } = await api.get('/imkan')
  return data
}

export const fetchImkan = async (id) => {
  const { data } = await api.get(`/imkan/${id}`)
  return data
}

export const postImkan = async (input) => {
  const { data } = await api.post('/imkan', input)
  return data
}

export const deleteImkan = async (id) => {
  const { data } = await api.delete(`/imkan/${id}`)
  return data
}

// Google Maps
export const fetchLatAndLng = async (input) => {
  const { data } = await axios.get(
    'https://maps.googleapis.com/maps/api/geocode/json',
    {
      params: {
        address: input,
        key: import.meta.env.VITE_GOOGLE_API_KEY,
      },
    }
  )
  return data
}

export default api
