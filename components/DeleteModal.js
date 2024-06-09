import React, { useState } from 'react'
import Modal from 'react-modal'
import axios from 'axios'
import { useUsersData } from '../context/user_context'

Modal.setAppElement('#__next')

const DeleteModal = ({ isOpen, onClose, userId }) => {
  const { deleteUser } = useUsersData()

  const handleDeleteUser = async () => {
    try {
      await axios.delete(
        `https://665621609f970b3b36c4625e.mockapi.io/users/${userId}`
      )
      deleteUser(userId)
      onClose()
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentClassName='delete-modal-content'
    >
      <div className='flex flex-col items-center justify-center h-full'>
        <h2 className='text-lg font-semibold mt-6 mb-4'>Delete User</h2>
        <p>Are you sure you want to delete this user?</p>
        <div className='flex justify-center mt-4'>
          <button
            onClick={handleDeleteUser}
            className='px-4 py-2 bg-red-500 text-white rounded-md mr-2'
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md'
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteModal
