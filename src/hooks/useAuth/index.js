import api from '../../utils/api'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
      setAuthenticated(true)
    }
  }, [])

  async function register(user) {
    try {
      const data = await api.post('/auth/register', user).then((response) => {
        return response.data
      })

      authUser(data)
    } catch (err) {
      console.log(err)
    }
  }




  async function authUser(data) {

    setAuthenticated(true)
    localStorage.setItem('token', JSON.stringify(data.token))

    navigate('/')
  }

  function logout() {
    setAuthenticated(false)
    localStorage.removeItem('token')
    api.defaults.headers.Authorization = undefined
    navigate('/')
  }
  async function login(user) {
    try {
      const data = await api.post('/auth/login', user).then((response) => {
        return response.data
      })

      authUser(data)
    } catch (err) {
      console.log(err)
    }
  }

  return { authenticated, register, logout, login }
}
