// features/tasks/tasksSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { format } from 'date-fns';

const initialState = {
  tasks: [],
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const formattedDate = format(new Date(action.payload.dueDate), 'dd-MM-yyyy');
      const newTask = { id: state.tasks.length + 1, ...action.payload, dueDate: formattedDate };
      state.tasks.push(newTask);
    },
    editTask: (state, action) => {
      const { id, title, description, dueDate } = action.payload;
      const task = state.tasks.find(task => task.id === id);
      if (task) {
        task.title = title || task.title;
        task.description = description || task.description;
        task.dueDate = dueDate ? format(new Date(dueDate), 'dd-MM-yyyy') : task.dueDate;
      }
    },
    deleteTask: (state, action) => {
      const { id } = action.payload;
      state.tasks = state.tasks.filter(task => task.id !== id);
    },
    markAsCompleted: (state, action) => {
      const { id } = action.payload;
      const task = state.tasks.find(task => task.id === id);
      if (task) {
        task.completed = true;
      }
    },
    filterTasks: (state, action) => {
      const { filter } = action.payload;
      state.tasks = state.tasks.filter(task => {
        if (filter === 'all') {
          return true;
        }
        if (filter === 'completed') {
          return task.completed;
        }
        if (filter === 'incompleted') {
          return !task.completed;
        }
      });
    },
  },
});

export const { addTask, editTask, deleteTask, markAsCompleted, filterTasks } = tasksSlice.actions;
export default tasksSlice.reducer;

