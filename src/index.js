import React from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'

import TaskList from './components/task-list'
import NewTaskForm from './components/new-task-form'
import Footer from './components/footer'

class App extends React.Component {
  maxId = 100

  state = {
    todos: [],
    filter: 'All',
    editing: 0,
    dontSubmit: false,
    dontCreate: false,
    createdMin: '00',
    createdSec: '00',
  }

  createTask = (description) => {
    const { createdMin, createdSec } = this.state

    let minsEdited = this.validTime(createdMin)
    if (!minsEdited) minsEdited = '00'

    let secsEdited = this.validTime(createdSec)
    if (!secsEdited) secsEdited = '00'

    const date = new Date()
    const setInterval = `${minsEdited}:${secsEdited}`
    return {
      description,
      done: false,
      id: this.maxId++,
      created: date,
      startTime: '',
      interval: '',
      intervalInMemory: setInterval,
    }
  }

  deleteCompleted = () => {
    const { todos } = this.state
    const completed = todos.filter((el) => el.done === true)
    completed.forEach((el) => this.deleteItem(el.id))
  }

  deleteItem = (id) => {
    if (this.state.editing) return
    this.setState(({ todos }) => {
      const i = todos.findIndex((el) => el.id === id)

      const newArr = [...todos.slice(0, i), ...todos.slice(i + 1)]

      return {
        todos: newArr,
      }
    })
  }

  editItem = (id) => {
    if (this.state.editing === 1) {
      return
    }
    const editCounter = this.state.editing + 1

    this.setState({
      editing: editCounter,
      editedId: id,
    })

    // это чтобы пробелы удалялись
    this.setState(({ todos }) => {
      const i = this.findTodoIdx(id)
      const todo = todos[i]
      return this.changeKeyInTodos(i, todos, 'description', todo.description.trim())
    })
  }

  editingItem = (id, e) => {
    const { value } = e.target
    if (!value.trim()) {
      this.setState({
        dontSubmit: true,
      })
    } else {
      this.setState({
        dontSubmit: false,
      })
    }

    this.setState(({ todos }) => {
      const i = this.findTodoIdx(id)
      return this.changeKeyInTodos(i, todos, 'description', value)
    })
  }

  removeEditClass = () => {
    this.setState({
      editing: 0,
      editedId: null,
    })
  }

  onToggleDone = (id, e) => {
    if (this.state.editing) return
    if (
      e.target.classList.contains('icon-edit') ||
      e.target.classList.contains('icon-destroy') ||
      e.target.classList.contains('icon-play') ||
      e.target.classList.contains('icon-pause')
    )
      return
    this.setState(({ todos }) => {
      const i = todos.findIndex((el) => el.id === id)
      const oldItem = todos[i]
      return this.changeKeyInTodos(i, todos, 'done', !oldItem.done)
    })

    this.onPause(id)
  }

  onFilter = (name) => {
    this.setState({ filter: name })
  }

  addItem = (input) => {
    const newItem = this.createTask(input)

    if (this.state.dontCreate) return

    this.setState(({ todos }) => {
      const newArr = [...todos, newItem]

      return {
        todos: newArr,
      }
    })

    this.setState({
      createdMin: 0,
      createdSec: 0,
    })
  }

  onPlay = (id) => {
    this.setState(({ todos }) => {
      const i = todos.findIndex((el) => el.id === id)
      return this.changeKeyInTodos(i, todos, 'startTime', new Date())
    })
  }

  updateInterval = (id, interval) => {
    this.setState(({ todos }) => {
      const i = todos.findIndex((el) => el.id === id)
      return this.changeKeyInTodos(i, todos, 'interval', interval)
    })
  }

  onPause = (id) => {
    this.setState(({ todos }) => {
      const i = todos.findIndex((el) => el.id === id)
      const intervalToSet = todos[i].interval || todos[i].intervalInMemory
      return this.changeKeyInTodos(i, todos, 'intervalInMemory', intervalToSet)
    })

    this.setState(({ todos }) => {
      const i = todos.findIndex((el) => el.id === id)
      return this.changeKeyInTodos(i, todos, 'startTime', '')
    })
  }

  onChangeMin = (e) => {
    const mins = e.target.value

    this.setState({
      createdMin: mins,
    })
  }

  onChangeSec = (e) => {
    const secs = e.target.value

    this.setState({
      createdSec: secs,
    })
  }

  validTime = (time) => {
    if (isNaN(time) || time > 59) return false

    if (time.toString().length === 1) {
      return `0${time}`
    } else {
      return time
    }
  }

  findTodoIdx(id) {
    const i = this.state.todos.findIndex((el) => el.id === id)
    return i
  }

  changeKeyInTodos(i, todos, keyToChange, newValue) {
    const oldItem = todos[i]
    const newItem = { ...oldItem, [keyToChange]: newValue }
    const newArr = [...todos.slice(0, i), newItem, ...todos.slice(i + 1)]
    return {
      todos: newArr,
    }
  }

  render() {
    const { todos, filter, editedId, dontSubmit } = this.state
    const doneCount = todos.filter((el) => el.done).length
    const tasksLeft = todos.length - doneCount

    window.addEventListener('click', (e) => {
      if (
        this.state.editing === 1 &&
        !e.target.classList.contains('icon-edit') &&
        !e.target.closest('.editing') &&
        !this.state.dontSubmit
      ) {
        // сабмитим изменения
        this.setState({
          editedId: null,
          dontSubmit: false,
          editing: 0,
        })
      } else return
    })

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm
            onTaskAdded={this.addItem}
            unable={!dontSubmit}
            onChangeMin={this.onChangeMin}
            onChangeSec={this.onChangeSec}
          />
        </header>
        <section className="main">
          <TaskList
            todos={todos}
            filter={filter}
            onDelete={this.deleteItem}
            onEdit={this.editItem}
            onToggleDone={this.onToggleDone}
            onEditing={this.editingItem}
            removeEditClass={this.removeEditClass}
            editedId={editedId}
            dontSubmit={dontSubmit}
            onPlay={this.onPlay}
            updateTodoInterval={this.updateInterval}
            onPause={this.onPause}
          />
          <Footer left={tasksLeft} onFilter={this.onFilter} onDeleteCompleted={this.deleteCompleted} />
        </section>
      </section>
    )
  }
}

const elem = <App />

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)
root.render(elem)
