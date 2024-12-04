import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import TaskForm from './components/taskForm';
import TaskList from './components/taskList';

function App() {
  return (
    <Provider store={store}>
      <div>
        <TaskForm />
        <TaskList />
      </div>
    </Provider>
  );
}

export default App;