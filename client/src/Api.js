import axios from "axios"

// Request interceptor
axios.interceptors.request.use(function (config) {
    const { origin }  = new URL(config.url)

    const allowedOrigins = ["http://localhost:4000"]
    const token =localStorage.getItem("access-token")

    if (allowedOrigins.includes(origin)) {
        config.headers.authorization = token
    }

    return config;
  }, function (error) {
    return Promise.reject(error);
  });

export const fetchCarouselData = async() => {
    const { data } = await axios.get(process.env.REACT_APP_BASE_ENDPOINT)

    return data;
}

export const fetchRegister = async(input) => {
    const { data } = await axios.post(`http://localhost:4000/auth/register`, input)

    return data;
}

export const fetchLogin = async(input) => {
    const { data } = await axios.post(`http://localhost:4000/auth/login`, input)

    return data;
}

export const fetchMe = async() => {
    const { data } = await axios.get(`http://localhost:4000/auth/me`)

    return data;
}

export const fetchLogout = async() => {
    const { data } = await axios.post(`http://localhost:4000/auth/logout`, {
        refresh_token: localStorage.getItem("refresh-token")
    })

    return data;
}

export const fetchHelpList = async() => {
    const { data } = await axios.get(`http://localhost:4000/help`)

    return data;
}

export const fetchHelp = async(id) => {
    const { data } = await axios.get(`http://localhost:4000/help/${id}`)

    return data;
}

export const fetchTalepList = async() => {
    const { data } = await axios.get(`http://localhost:4000/talep`)

    return data;
}

export const fetchTalep = async(id) => {
    const { data } = await axios.get(`http://localhost:4000/talep/${id}`)

    return data;
}

export const fetchImkanList = async() => {
    const { data } = await axios.get(`http://localhost:4000/imkan`)

    return data;
}

export const fetchImkan = async(id) => {
    const { data } = await axios.get(`http://localhost:4000/imkan/${id}`)

    return data;
}

export const fetchUserList = async() => {
    const { data } = await axios.get(`http://localhost:4000/auth`)

    return data;
}

export const fetchUser = async(id) => {
    const { data } = await axios.get(`http://localhost:4000/auth/me/${id}`)

    return data;
}

export const fetchLatAndLng = async(input) => {
    const { data } = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
        params: {
            address: input,
            key: process.env.REACT_APP_GOOGLE_API_KEY
        }
    }) 
    
    return data;
}

export const postTalep = async(input) => {
    const { data } = await axios.post(`http://localhost:4000/talep/`, input)
    
    return data;
}

export const postImkan = async(input) => {
    const { data } = await axios.post(`http://localhost:4000/imkan`, input)
    
    return data;
}

export const postHelps = async(input) => {
    const { data } = await axios.post(`http://localhost:4000/help/`, input)
    
    return data;
}

export const deleteTalep = async(id) => {
    const { data } = await axios.delete(`http://localhost:4000/talep/${id}`)

    return data;
}

export const deleteImkan = async(id) => {
    const { data } = await axios.delete(`http://localhost:4000/imkan/${id}`)

    return data;
}

export const deleteUser = async(id) => {
    const { data } = await axios.delete(`http://localhost:4000/auth/${id}`)

    return data;
}