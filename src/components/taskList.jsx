import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format, isBefore } from 'date-fns';
import TaskItem from './taskItems';
import { editTask, deleteTask, markAsCompleted } from '../features/tasks/tasksSlice';

function TaskList() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const handleEditTask = (task) => {
    const newTitle = prompt('Enter new title', task.title) || task.title;
    const newDescription = prompt('Enter new description', task.description) || task.description;
    const newDueDate = prompt('Enter new due date (dd-mm-yyyy)', task.dueDate) || task.dueDate;
    dispatch(editTask({ id: task.id, title: newTitle, description: newDescription, dueDate: format(new Date(newDueDate), 'dd-MM-yyyy') }));
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask({ id: taskId }));
  };

  const handleMarkAsCompleted = (taskId) => {
    dispatch(markAsCompleted({ id: taskId }));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const getFilteredTasks = () => {
    const filteredTasks = tasks.filter((task) => {
      const taskTitle = task.title.toLowerCase();
      return taskTitle.includes(searchTerm);
    });

    const today = new Date();
    switch (selectedFilter) {
      case 'all':
        return filteredTasks;
      case 'completed':
        return filteredTasks.filter((task) => task.completed);
      case 'pending':
        return filteredTasks.filter((task) => !task.completed && !isBefore(new Date(task.dueDate), today));
      case 'overdue':
        return filteredTasks.filter((task) => !task.completed && isBefore(new Date(task.dueDate), today));
      default:
        return filteredTasks;
    }
  };

  return (
    <div className="min-h-screen bg-slate-800">
      <div className="flex items-center justify-center p-4">
        <input
          className="text-white bg-slate-800 p-2"
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="flex items-center justify-center p-4">
        <select
          className="text-white bg-slate-800 p-2"
          value={selectedFilter}
          onChange={(event) => setSelectedFilter(event.target.value)}
        >
          <option value="all">All Tasks</option>
          <option value="completed">Completed Tasks</option>
          <option value="pending">Pending Tasks</option>
          <option value="overdue">Overdue Tasks</option>
        </select>
      </div>
      <div className={`flex flex-col items-center ${getFilteredTasks().length ? 'min-h-screen' : ''}`}>
        {getFilteredTasks().length === 0 ? (
          <div className="text-center text-white mt-4">No tasks available</div>
        ) : (
          getFilteredTasks().map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={() => handleEditTask(task)}
              onDelete={() => handleDeleteTask(task.id)}
              onMarkAsCompleted={() => handleMarkAsCompleted(task.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TaskList;

