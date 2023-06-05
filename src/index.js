import React from 'react';
import {createRoot} from 'react-dom/client';

import './index.css';

import TaskList from "./components/task-list";
import NewTaskForm from './components/new-task-form';
import Footer from './components/footer';


const App = () => {
  const todos = [
    { className: 'completed', description: 'Completed task'},
    { className: 'editing', description: 'Editing task'},
    { className: '', description: 'Active task'},
  ]

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm />
      </header>
      <section className="main">
        <TaskList todos={todos}/>
        <Footer />
      </section>
    </section>
  )
}

const elem = <App />

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(elem);