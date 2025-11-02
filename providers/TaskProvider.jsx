// app/providers/TaskProvider.jsx
"use client";

import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";

// ---------------------------------------------------------------------
// 1. Context
// ---------------------------------------------------------------------
const TaskContext = createContext(undefined);

// ---------------------------------------------------------------------
// 2. Provider Component
// ---------------------------------------------------------------------
export function TaskProvider({ children }) {
  // ── Global state ─────────────────────────────────────────────────────
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ── Filters ──────────────────────────────────────────────────────────
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [dueDateFilter, setDueDateFilter] = useState("");

  // ── Pagination ───────────────────────────────────────────────────────
  const tasksPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  // ── Modal states ─────────────────────────────────────────────────────
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);

  // ---------------------------------------------------------------------
  // 3. API helpers (all in one place)
  // ---------------------------------------------------------------------
  const api = useCallback(
    async (url, opts = {}) => {
      const res = await fetch(url, {
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        ...opts,
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || res.statusText);
      }
      return res.json();
    },
    []
  );

  const fetchTasks = useCallback(async () => {
    try {
      const data = await api("http://localhost:5000/tasks");
      setTasks(Array.isArray(data) ? data : data.tasks || []);
    } catch (e) {
      console.error(e);
    }
  }, [api]);

  const fetchUsers = useCallback(async () => {
    try {
      const data = await api("http://localhost:5000/users");
      setUsers(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    }
  }, [api]);

  const fetchCurrentUser = useCallback(async () => {
    try {
      const data = await api("http://localhost:5000/auth/profile");
      setCurrentUser(data);
    } catch (e) {
      console.error(e);
    }
  }, [api]);

  // ── Initial load ─────────────────────────────────────────────────────
  useEffect(() => {
    Promise.all([fetchTasks(), fetchUsers(), fetchCurrentUser()]).finally(() =>
      setLoading(false)
    );
  }, [fetchTasks, fetchUsers, fetchCurrentUser]);

  // ── Create task ──────────────────────────────────────────────────────
  const createTask = useCallback(
    async (payload) => {
      const newTask = await api("http://localhost:5000/tasks", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      setTasks((prev) => [newTask, ...prev]);
      return newTask;
    },
    [api]
  );

  // ── Update task ──────────────────────────────────────────────────────
  const updateTask = useCallback(
    async (id, payload) => {
      const updated = await api(`http://localhost:5000/tasks/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
      setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
      return updated;
    },
    [api]
  );

  // ── Delete task ──────────────────────────────────────────────────────
  const deleteTask = useCallback(
    async (id) => {
      await api(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });
      setTasks((prev) => prev.filter((t) => t._id !== id));
    },
    [api]
  );

  // ---------------------------------------------------------------------
  // 4. Filtering + Pagination
  // ---------------------------------------------------------------------
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const searchMatch =
        task.title?.toLowerCase().includes(search.toLowerCase()) ||
        task.description?.toLowerCase().includes(search.toLowerCase());

      const statusMatch = statusFilter ? task.status === statusFilter : true;
      const priorityMatch = priorityFilter ? task.priority === priorityFilter : true;
      const dueMatch = dueDateFilter
        ? new Date(task.dueDate).toISOString().split("T")[0] === dueDateFilter
        : true;

      return searchMatch && statusMatch && priorityMatch && dueMatch;
    });
  }, [tasks, search, statusFilter, priorityFilter, dueDateFilter]);

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const indexOfLast = currentPage * tasksPerPage;
  const indexOfFirst = indexOfLast - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirst, indexOfLast);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredTasks.length]);

  // ---------------------------------------------------------------------
  // 5. Context value
  // ---------------------------------------------------------------------
  const value = {
    // data
    tasks,
    filteredTasks,
    currentTasks,
    users,
    currentUser,
    loading,

    // UI state
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    dueDateFilter,
    setDueDateFilter,
    currentPage,
    setCurrentPage,
    totalPages,
    tasksPerPage,

    // modals
    isCreateOpen,
    setIsCreateOpen,
    editingTask,
    setEditingTask,
    deletingTask,
    setDeletingTask,

    // actions
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

// ---------------------------------------------------------------------
// 6. Hook to use the context
// ---------------------------------------------------------------------
export const useTask = () => {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTask must be used within TaskProvider");
  return ctx;
};