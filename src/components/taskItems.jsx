import React from 'react';
import { useDispatch } from 'react-redux';
import { editTask, deleteTask, markAsCompleted } from '../features/tasks/tasksSlice';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';

function TaskItem({ task }) {
  const dispatch = useDispatch();

  const handleEdit = () => {
    const title = prompt('Enter new title', task.title) || task.title;
    const description = prompt('Enter new description', task.description) || task.description;
    const dueDate = prompt('Enter new due date (dd-mm-yyyy)', task.dueDate) || task.dueDate;
    dispatch(editTask({ id: task.id, title, description, dueDate }));
  };

  const handleDelete = () => {
    dispatch(deleteTask({ id: task.id }));
  };

  const handleMarkAsCompleted = () => {
    dispatch(markAsCompleted({ id: task.id }));
  };

  return (
    <Card className='w-[89%] mx-auto my-8'>
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          style={{
            textDecoration: task.completed ? 'line-through' : '',
          }}
        >
          {task.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {task.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Due Date: {task.dueDate}
        </Typography>
        <IconButton aria-label="edit" onClick={handleEdit}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete" onClick={() => handleDelete(task.id)}>
          <DeleteIcon />
        </IconButton>
        <IconButton aria-label="mark as completed" onClick={handleMarkAsCompleted}>
          <CheckIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
}

export default TaskItem;

