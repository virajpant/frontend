"use client";
import React from "react";

export default function EditForm({
  setEditingTask,
  handleUpdate,
  formData,
  setFormData,
  users,
  currentUser, 
}) {
  const isAdmin = currentUser?.role === "admin";

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-2 sm:p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl p-4 sm:p-6 overflow-y-auto max-h-[90vh]">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-5 text-center">
          Edit Task
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdate();
          }}
          className="space-y-3 sm:space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm sm:text-base"
              placeholder="Enter task title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
              rows={3}
              placeholder="Enter task description (optional)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) =>
                setFormData({ ...formData, dueDate: e.target.value })
              }
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assigned To
            </label>

            <select
              value={formData.assignedTo}
              onChange={(e) =>
                isAdmin
                  ? setFormData({ ...formData, assignedTo: e.target.value })
                  : null
              }
              disabled={!isAdmin} 
              className={`w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 ${
                isAdmin
                  ? "focus:ring-indigo-500"
                  : "bg-gray-100 cursor-not-allowed text-gray-500"
              } text-sm sm:text-base`}
            >
              {isAdmin ? (
                <>
                  <option value="">Unassigned</option>
                  {users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name || user.email}
                    </option>
                  ))}
                </>
              ) : (
                <option value={formData.assignedTo}>
                  {users.find((u) => u._id === formData.assignedTo)?.name ||
                    "Already Assigned to User"}
                </option>
              )}
            </select>

            {!isAdmin && (
              <p className="text-xs text-gray-500 mt-1">
                Only admins can change task assignment.
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) =>
                  setFormData({ ...formData, priority: e.target.value })
                }
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-3">
            <button
              type="submit"
              className="flex-1 py-2 bg-indigo-600 text-white rounded-lg cursor-pointer hover:bg-indigo-700 font-medium text-sm sm:text-base"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditingTask(null)}
              className="flex-1 py-2 bg-gray-200 text-gray-700 cursor-pointer rounded-lg hover:bg-gray-300 font-medium text-sm sm:text-base"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
