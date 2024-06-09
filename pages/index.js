import Image from 'next/image'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import useUserData from '../hooks/useUserData' // Custom hook for fetching users
import DataTable from '../components/DataTable' // Tanstack Table component
import { DateTime } from 'luxon'
import MessageIcon from '/public/msg.jpeg'
import MessageModal from '../components/MessageModal'
import AddUpdateModal from '../components/AddUpdateModal'
import { useUsersData } from '../context/user_context'

const inter = Inter({ subsets: ['latin'] })

const Home = () => {
  const router = useRouter()
  const { usersData } = useUsersData()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAddUpdateModalOpen, setIsAddUpdateModalOpen] = useState(false)

  const { isLoading, error } = useUserData(router.query)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleOpenAddUpdateModal = () => {
    setIsAddUpdateModalOpen(true)
  }

  const handleCloseAddUpdateModal = () => {
    setIsAddUpdateModalOpen(false)
  }

  const columns = [
    {
      header: 'ID',
      accessorKey: 'id',
    },
    {
      header: 'Image',
      accessorKey: 'avatar',
      enableColumnFilter: false,
      cell: (avatar) => (
        <div className='flex justify-center'>
          {avatar.getValue() ? (
            <img
              src={avatar.getValue()}
              alt='avatar'
              className='w-10 h-10 rounded-full'
            />
          ) : (
            <img
              src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOuxrvcNMfGLh73uKP1QqYpKoCB0JLXiBMvA&s'
              alt='default-avatar'
              className='w-10 h-10 rounded-full'
            />
          )}
        </div>
      ),
    },
    {
      header: 'UserName',
      accessorKey: 'username',
    },
    {
      header: 'FullName',
      accessorKey: 'fullName',
    },
    {
      header: 'Active',
      accessorKey: 'active',
    },
    {
      header: 'CreatedAt',
      accessorKey: 'createdAt',
      cell: (info) =>
        DateTime.fromISO(info.getValue()).toLocaleString(DateTime.DATE_MED),
    },
    {
      header: 'Actions',
      accessorKey: 'messageIcon',
      enableColumnFilter: false,
      cell: () => (
        <button onClick={handleOpenModal}>
          <Image src={MessageIcon} alt='Msg-Icon' className='w-6 h-6' />
        </button>
      ),
    },
  ]

  return (
    <div className='p-4'>
      <Head>
        <title>User Management System</title>
        <meta name='description' content='User Management System' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <button
        type='submit'
        className='px-5 py-2 bg-blue-500 text-white text-md rounded'
        onClick={handleOpenAddUpdateModal}
      >
        Add New User
      </button>

      {error && <div>Error: {error.message}</div>}
      {isLoading ? (
        <div className='text-2xl text-center font-bold mb-4'>Loading...</div>
      ) : (
        <DataTable columns={columns} data={usersData} />
      )}
      <MessageModal isOpen={isModalOpen} onClose={handleCloseModal} />
      <AddUpdateModal
        isOpen={isAddUpdateModalOpen}
        onClose={handleCloseAddUpdateModal}
      />
    </div>
  )
}

export default Home
