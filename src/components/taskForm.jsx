import React from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../features/tasks/tasksSlice';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});




function TaskForm() {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [dueDate, setDueDate] = React.useState('');

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTask({ title, description, dueDate }));
    // Clear form fields
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  return (
    <ThemeProvider theme={theme}>
    <div className='h-full w-screen bg-slate-800'>
      <form onSubmit={handleSubmit} className='h-full w-screen flex justify-between items-center mx-5 overflow-x-hidden'>
        <div className='h-full w-1/2  flex flex-col justify-between items-center gap-32'>
          <TextField
            id="standard-basic"
            label="Title"
            variant="standard"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          className='h-1/2 w-3/4 my-8'/>
          <TextField
            type="date"
            label=""
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          className='h-1/2 w-3/4 my-8 mx-4'/>
        </div>
        <div className='h-full w-1/2 py-4 flex flex-col items-center gap-4'>
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={6}
            defaultValue="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          className='h-3/4 w-3/4 my-4'/>
        <Button variant="contained" type="submit" className='h-[20%] w-3/4'>Add Task</Button>
        </div>
      </form>
    </div>
    </ThemeProvider>
  );
}

export default TaskForm;

