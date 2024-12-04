// store.js
import { configureStore } from '@reduxjs/toolkit';
import tasksReducer, { addTask, editTask, deleteTask, markAsCompleted, filterTasks } from '../features/tasks/tasksSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export { addTask, editTask, deleteTask, markAsCompleted, filterTasks };
