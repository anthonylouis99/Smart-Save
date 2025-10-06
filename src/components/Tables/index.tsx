import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  type ColumnDef,
  type SortingState
} from '@tanstack/react-table'
import { useState } from 'react';
import Button from '../common/Button/Button';
export function Tables({
  data,
  columns,
  header,
}: {
  data: unknown[]
  columns: ColumnDef<unknown, unknown>[]
  header?: string
}) {
const[filtering,setFiltering]=useState("")
const [sorting, setSorting] = useState<SortingState>([])


  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter:filtering},
    onSortingChange: setSorting,
    onGlobalFilterChange:setFiltering,
    debugTable: true,
  })

  return (
    <div className="overflow-x-auto mt-6 rounded-lg shadow-sm bordershadow-lg border-gray-200">
      <div className="min-w-full divide-y flex justify-between divide-gray-200 px-4 py-4  font-bold text-gray-700">
        <p>
          {header?header:"Transaction History"}
          
        </p>

        <input
          type="text"
          value={filtering ?? ''}
          onChange={(e) => setFiltering(e.target.value)}
          placeholder="Search..."
          className="p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
        />
      </div>


      <table className="min-w-full text-sm text-left text-gray-600">
      
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-medium">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-3 border-b border-gray-200"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

     
        <tbody className="divide-y divide-gray-200 bg-white">
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="hover:bg-gray-50 transition-colors"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-4 py-3 whitespace-nowrap"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-between space-x-2 p-4">
        <div className="flex items-center space-x-2">
          <Button
         
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
             variant='secondary'
          >
            Previous
          </Button>
          <Button
    
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            variant='secondary'
          >
            Next
          </Button>
        </div>
        <div className="text-sm text-gray-700">
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </div>
      </div>
    </div>
  )
}
