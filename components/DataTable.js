import React, { useState } from 'react'
import Image from 'next/image'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import DeleteIcon from '../public/delteImg.jpeg'
import UpdateIcon from '../public/updateImg.jpeg'
import UpdateModal from './UpdateModal'
import DeleteModal from './DeleteModal'

const DataTable = ({ columns, data }) => {
  const [sorting, setSorting] = useState([])
  const [filtering, setFiltering] = useState('')
  const [columnFiltering, setColumnFiltering] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [selectedUserId, setSelectedUserId] = useState(null)

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
      columnFilters: columnFiltering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
    onColumnFiltersChange: setColumnFiltering,
  })

  const handleOpenUpdateModal = (user) => {
    setSelectedUser(user)
  }

  const handleCloseUpdateModal = () => {
    setSelectedUser(null)
  }

  const handleOpenDeleteModal = (userId) => {
    setSelectedUserId(userId)
  }

  const handleCloseDeleteModal = () => {
    setSelectedUserId(null)
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl text-center font-bold mb-4'>Users Data</h1>
      <div className='flex items-center mb-4'>
        <input
          type='text'
          placeholder='Search by username or email'
          className='px-4 py-2 mr-2 w-full border rounded'
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
        />
      </div>

      <table className='table-auto w-full'>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className='px-4 py-2  bg-gray-200 text-gray-600 cursor-pointer'
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {
                    { asc: '🔼', desc: '🔽' }[
                      header.column.getIsSorted() ?? null
                    ]
                  }
                  {header.column.getCanFilter() ? (
                    <div>
                      <input
                        className='border rounded text-sm text-center'
                        type='text'
                        value={header.column.getFilterValue() || ''}
                        onChange={(e) =>
                          header.column.setFilterValue(e.target.value)
                        }
                      />
                    </div>
                  ) : null}
                </th>
              ))}
              <th className='px-4 py-2  bg-gray-200 text-gray-600 '>Edit</th>
              <th className='px-4 py-2  bg-gray-200 text-gray-600 '>Delete</th>
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className='border text-center px-4 py-2'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
              <td className='border text-center px-4 py-3'>
                <button onClick={() => handleOpenUpdateModal(row.original)}>
                  <Image
                    src={UpdateIcon}
                    alt='Update-Icon'
                    className='w-8 h-8'
                  />
                </button>
              </td>
              <td className='border text-center px-4 py-2'>
                <button onClick={() => handleOpenDeleteModal(row.original.id)}>
                  <Image
                    src={DeleteIcon}
                    alt='Delete-Icon'
                    className='w-6 h-6'
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='mt-4 flex justify-center gap-4 '>
        <button
          className='px-4 py-2  bg-gray-200 text-gray-800 rounded-md disabled:opacity-35 disabled:cursor-not-allowed'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous Page
        </button>
        <div className='px-4 py-2  bg-gray-200 text-gray-800 rounded-md'>
          Page{' '}
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </div>
        <button
          className='px-4 py-2  bg-gray-200 text-gray-800 rounded-md disabled:opacity-35 disabled:cursor-not-allowed'
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          Next Page
        </button>
      </div>
      {selectedUser && (
        <UpdateModal
          isOpen={true}
          onClose={handleCloseUpdateModal}
          userData={selectedUser}
        />
      )}
      {selectedUserId && (
        <DeleteModal
          isOpen={true}
          onClose={handleCloseDeleteModal}
          userId={selectedUserId}
        />
      )}
    </div>
  )
}

export default DataTable
