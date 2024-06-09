import { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = 'https://665621609f970b3b36c4625e.mockapi.io/users'

const useUserData = (queryParams) => {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get(API_URL, { params: queryParams })

        setUsers(response.data)
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [queryParams])

  return { users, isLoading, error }
}

export default useUserData
