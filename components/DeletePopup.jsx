import React from 'react'

export default function DeletePopup({setDeletingTask , handleDelete}) {
  return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Delete Task?</h3>
            <p className="text-sm text-gray-600 mb-5">This action cannot be undone.</p>

            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                className="flex-1 py-2 bg-red-600 cursor-pointer text-white rounded-lg hover:bg-red-700 font-medium"
              >
                Delete
              </button>
              <button
                onClick={() => setDeletingTask(null)}
                className="flex-1 py-2 bg-gray-200 text-gray-700 cursor-pointer rounded-lg hover:bg-gray-300 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
  )
}
