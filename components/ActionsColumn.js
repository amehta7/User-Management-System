import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEnvelope,
  faTrashAlt,
  faEdit,
} from '@fortawesome/free-solid-svg-icons'

const ActionsColumn = ({ handleOpenModal }) => {
  return (
    <div className='flex items-center'>
      <button onClick={handleOpenModal} className='mr-2'>
        <FontAwesomeIcon
          icon={faEnvelope}
          className='text-blue-500 hover:text-blue-700 cursor-pointer'
        />
      </button>
      <button className='mr-2'>
        <FontAwesomeIcon
          icon={faTrashAlt}
          className='text-red-500 hover:text-red-700 cursor-pointer'
        />
      </button>
      <button className='mr-2'>
        <FontAwesomeIcon
          icon={faEdit}
          className='text-green-500 hover:text-green-700 cursor-pointer'
        />
      </button>
    </div>
  )
}

export default ActionsColumn
