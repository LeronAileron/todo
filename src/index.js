import React from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';

import TaskList from "./components/task-list";
import NewTaskForm from './components/new-task-form';
import Footer from './components/footer';


class App extends React.Component {
  maxId = 100;

  state = {
    todos: [
      this.createTask('Completed task'),
      this.createTask('Editing task'),
      this.createTask('Active task'),
    ],
    filter: 'All',
  }

  createTask(description) {
    return {
      description,
      done: false,
      id: this.maxId++,
    }
  }

  deleteCompleted = (id) => {
    const {todos} = this.state;
    const completed =  todos.filter(el => el.done === true);
    completed.forEach(el => this.deleteItem(el.id));
  }

  deleteItem = id => {
    this.setState(({ todos }) => {
      const i = todos.findIndex(el => el.id === id);

      const newArr = [
        ...todos.slice(0, i),
        ...todos.slice(i + 1)
      ]

      return {
        todos: newArr
      }
    })
  }

  onToggleDone = id => {
    this.setState(({ todos }) => {
      const i = todos.findIndex(el => el.id === id);

      const oldItem = todos[i];
      if (!oldItem) return;
      const newItem = { ...oldItem, done: !oldItem.done };

      const newArr = [
        ...todos.slice(0, i),
        newItem,
        ...todos.slice(i + 1)
      ]

      return {
        todos: newArr
      }
    })
  }

  onFilter = name => {
    this.setState({filter: name})
  }
  

  addItem = (input) => {
    const newItem = this.createTask(input);

    this.setState(({ todos }) => {
      const newArr = [
        ...todos,
        newItem
      ]

      return {
        todos: newArr
      }
    })
  }


render() {
  const { todos, filter } = this.state;
  const doneCount = todos
    .filter(el => el.done)
    .length;
  const tasksLeft = todos.length - doneCount;

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onTaskAdded={this.addItem} />
      </header>
      <section className="main">
        <TaskList
          todos={todos}
          filter={filter}
          onDelete={this.deleteItem}
          onToggleDone={this.onToggleDone}
        />
        <Footer 
          left={tasksLeft}
          onFilter={this.onFilter}
          onDeleteCompleted={this.deleteCompleted} 
        />
      </section>
    </section>
  )
}

}

const elem = <App />

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(elem);