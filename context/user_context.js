import React, { createContext, useState, useContext, useEffect } from 'react'
import useUserData from '../hooks/useUserData' // Custom hook for fetching users
import { useRouter } from 'next/router'

const UsersDataContext = createContext()

export const useUsersData = () => useContext(UsersDataContext)

export const UsersDataProvider = ({ children }) => {
  const router = useRouter()

  const [usersData, setUsersData] = useState([])
  const { users, isLoading, error } = useUserData(router.query) // Fetch users
  //console.log(users)

  useEffect(() => {
    if (users) {
      setUsersData(users)
    }
  }, [users])

  const addUser = (newUser) => {
    setUsersData((prevUsers) => [...prevUsers, newUser])
  }

  const updateUser = (updatedUser) => {
    setUsersData((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    )
  }

  const deleteUser = (deletedUserId) => {
    setUsersData((prevUsers) =>
      prevUsers.filter((user) => user.id !== deletedUserId)
    )
  }

  return (
    <UsersDataContext.Provider
      value={{ usersData, addUser, updateUser, deleteUser }}
    >
      {children}
    </UsersDataContext.Provider>
  )
}
