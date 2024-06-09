import React, { useState } from 'react'
import Modal from 'react-modal'
import { useRouter } from 'next/router'
import useUserData from '../hooks/useUserData' // Custom hook for fetching users
import SmileImage from '/public/smile.jpg'

const MessageModal = ({ isOpen, onClose }) => {
  const router = useRouter()
  const { users, isLoading, error } = useUserData(router.query)

  const [searchTerm, setSearchTerm] = useState('')
  const [filteredUsers, setFilteredUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [message, setMessage] = useState('')
  const [showActions, setShowActions] = useState(false)
  const [showUsers, setShowUsers] = useState(false)

  //console.log(users)

  // Function to perform fuzzy matching
  const fuzzyMatch = (search, username) => {
    const searchWords = search.split(' ')
    return searchWords.every((word) => username.includes(word))
  }

  // Function to filter users based on search term
  const filterUsers = (search) => {
    const sanitizedSearch = search.toLowerCase().replace(/[^a-z0-9]/g, '') // Remove non-alphanumeric characters
    //console.log('search', sanitizedSearch)

    return search.length > 1
      ? users.filter((user) => {
          const sanitizedUsername = user.fullName
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '')

          return sanitizedUsername.includes(sanitizedSearch)
        })
      : users.slice(0, 3)
  }

  // Function to handle user input change
  const handleInputChange = (event) => {
    const { value } = event.target
    setSearchTerm(value)

    if (value.startsWith('/')) {
      setShowActions(true)
    } else if (value.startsWith('@')) {
      setShowUsers(true)
      const filtered = filterUsers(value)
      setFilteredUsers(filtered)
    } else if (value === selectedUser) {
      setShowUsers(false)
    } else {
      setShowActions(false)
      setShowUsers(false)
    }
  }

  // Function to handle user selection
  const handleUserSelection = (username) => {
    setSearchTerm(username)
    setSelectedUser(username)

    if (searchTerm === selectedUser) {
      setShowUsers(false)
    }
  }

  // Function to replace emojis with images
  const replaceEmojis = (message) => {
    return message.replace(/:[a-z_]+:/g, (match) => {
      const emojiMap = {
        ':smile:': `${SmileImage}`,
      }

      return emojiMap[match] || match
    })
  }

  // Function to handle message input change
  const handleMessageChange = (event) => {
    const { value } = event.target
    setMessage(replaceEmojis(value)) // Replace emojis with images in the message
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      style={{
        content: {
          width: '90%',
          maxWidth: '500px',
          margin: 'auto',
          borderRadius: '8px',
          padding: '20px',
          maxHeight: '90vh',
          overflowY: 'auto',
          border: '1px solid #4a90e2',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <div className='flex flex-col items-center p-4 sm:p-6'>
        <h2 className='text-lg font-semibold mb-5'>Send Message</h2>
        <input
          type='text'
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Type '@' to tag a user..."
          className={`border border-gray-300 p-4 rounded-md mb-4 w-full ${
            searchTerm === selectedUser ? 'bg-blue-100' : ''
          }`}
        />
        {showActions && (
          <div className='flex flex-col w-full border border-gray-300 rounded-md mb-4'>
            <div
              className='p-2 cursor-pointer hover:bg-gray-100'
              onClick={() => setMessage(message + '/mute @user')}
            >
              /mute @user
            </div>
            <div
              className='p-2 cursor-pointer hover:bg-gray-100'
              onClick={() => setMessage(message + '/ban @user')}
            >
              /ban @user
            </div>
            <div
              className='p-2 cursor-pointer hover:bg-gray-100'
              onClick={() => setMessage(message + '/title ')}
            >
              /title set a title for the current stream
            </div>
            <div
              className='p-2 cursor-pointer hover:bg-gray-100'
              onClick={() => setMessage(message + '/description ')}
            >
              /description set a description for the current stream
            </div>
          </div>
        )}
        {showUsers ? (
          <div className='flex flex-col w-full max-h-40 overflow-y-auto border border-gray-300 rounded-md mb-4'>
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className={`p-2 cursor-pointer hover:bg-gray-100 ${
                  user.fullName === selectedUser ? 'bg-blue-100' : ''
                }`}
                onClick={() => handleUserSelection(user.fullName)}
              >
                @{user.fullName}
              </div>
            ))}
          </div>
        ) : null}
        <div className='flex-grow'></div>{' '}
        <textarea
          rows={5}
          placeholder='Type your message here...'
          value={message}
          onChange={handleMessageChange}
          className='border border-gray-300 p-4 rounded-md mb-4 w-full resize-none'
        />
        <button
          onClick={onClose}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold mb-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        >
          Close
        </button>
      </div>
    </Modal>
  )
}

export default MessageModal
