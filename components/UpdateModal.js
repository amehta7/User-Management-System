import React, { useState } from 'react'
import Modal from 'react-modal'
import axios from 'axios'
import { useUsersData } from '../context/user_context'

Modal.setAppElement('#__next')

const UpdateModal = ({ isOpen, onClose, userData }) => {
  const { updateUser } = useUsersData()

  const [updatedUserData, setUpdatedUserData] = useState({
    username: userData?.username || '',
    fullName: userData?.fullName || '',
    avatar: userData?.avatar || '',
    active: userData?.active || false,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setUpdatedUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.put(
        `https://665621609f970b3b36c4625e.mockapi.io/users/${userData.id}`,
        updatedUserData
      )

      updateUser(response.data)

      onClose()
    } catch (error) {
      console.error('Error updating user:', error)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentClassName='modal-content'
    >
      <div className='flex flex-col items-center justify-center h-full'>
        <h2 className='text-xl font-semibold mt-6 mb-4'>Update User</h2>
        <form onSubmit={handleSubmit} className='w-full max-w-md'>
          <div className='mb-4'>
            <label
              htmlFor='username'
              className='block text-sm font-medium text-gray-700'
            >
              Username
            </label>
            <input
              type='text'
              id='username'
              name='username'
              value={updatedUserData.username}
              onChange={handleChange}
              className='mt-1 p-2 border border-gray-300 rounded-md w-full'
              required
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='fullName'
              className='block text-sm font-medium text-gray-700'
            >
              Full Name
            </label>
            <input
              type='text'
              id='fullName'
              name='fullName'
              value={updatedUserData.fullName}
              onChange={handleChange}
              className='mt-1 p-2 border border-gray-300 rounded-md w-full'
              required
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='avatar'
              className='block text-sm font-medium text-gray-700'
            >
              Avatar URL
            </label>
            <input
              type='text'
              id='avatar'
              name='avatar'
              value={updatedUserData.avatar}
              onChange={handleChange}
              className='mt-1 p-2 border border-gray-300 rounded-md w-full'
              required
            />
          </div>
          <div className='mb-4'>
            <input
              type='checkbox'
              id='active'
              name='active'
              checked={updatedUserData.active}
              onChange={(e) =>
                setUpdatedUserData((prevUserData) => ({
                  ...prevUserData,
                  active: e.target.checked,
                }))
              }
              className='mr-2'
            />
            <label
              htmlFor='active'
              className='text-sm font-medium text-gray-700'
            >
              Active
            </label>
          </div>
          <div className='flex justify-end'>
            <button
              type='submit'
              className='px-4 py-2 mb-6 bg-blue-500 text-white rounded-md mr-2'
            >
              Update User
            </button>
            <button
              type='button'
              className='px-4 py-2 mb-6 bg-gray-300 text-gray-700 rounded-md'
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default UpdateModal
