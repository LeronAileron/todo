import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'

import TaskList from './components/task-list'
import NewTaskForm from './components/new-task-form'
import Footer from './components/footer'

let maxId = 100

const App = () => {
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState('All')
  const [editing, setEditing] = useState(0)
  const [editedId, setEditedId] = useState(null)
  const [dontSubmit, setDontSubmit] = useState(false)
  const [createdMin, setCreatedMin] = useState('00')
  const [createdSec, setCreatedSec] = useState('00')

  function createTask(description) {
    let minsEdited = validTime(createdMin)
    if (!minsEdited) minsEdited = '00'

    let secsEdited = validTime(createdSec)
    if (!secsEdited) secsEdited = '00'

    const date = new Date()
    const setInterval = `${minsEdited}:${secsEdited}`
    const id = maxId++
    return {
      description,
      done: false,
      id,
      created: date,
      startTime: '',
      interval: '',
      intervalInMemory: setInterval,
    }
  }

  function deleteCompleted() {
    const completed = todos.filter((el) => el.done === true)
    completed.forEach((el) => deleteItem(el.id))
  }

  function deleteItem(id) {
    if (editing) return

    setTodos((todos) => {
      const i = todos.findIndex((el) => el.id === id)

      const newArr = [...todos.slice(0, i), ...todos.slice(i + 1)]

      return newArr
    })
  }

  function editItem(id) {
    if (editing === 1) {
      return
    }
    const editCounter = editing + 1

    setEditing(editCounter)
    setEditedId(id)

    // это чтобы пробелы удалялись
    setTodos((todos) => {
      const i = findTodoIdx(id)
      const todo = todos[i]
      return changeKeyInTodos(i, todos, 'description', todo.description.trim())
    })
  }

  function editingItem(id, e) {
    const { value } = e.target
    if (!value.trim()) {
      setDontSubmit(true)
    } else {
      setDontSubmit(false)
    }

    setTodos((todos) => {
      const i = findTodoIdx(id)
      return changeKeyInTodos(i, todos, 'description', value)
    })
  }

  function removeEditClass() {
    setEditing(0)
    setEditedId(null)
  }

  function onToggleDone(id, e) {
    if (editing) return
    if (
      e.target.classList.contains('icon-edit') ||
      e.target.classList.contains('icon-destroy') ||
      e.target.classList.contains('icon-play') ||
      e.target.classList.contains('icon-pause')
    )
      return

    setTodos((todos) => {
      const i = todos.findIndex((el) => el.id === id)
      const oldItem = todos[i]
      return changeKeyInTodos(i, todos, 'done', !oldItem.done)
    })

    onPause(id)
  }

  function onFilter(name) {
    setFilter(name)
  }

  function addItem(input) {
    const newItem = createTask(input)

    setTodos((todos) => {
      const newArr = [...todos, newItem]
      return newArr
    })
    setCreatedMin(0)
    setCreatedSec(0)
  }

  function onPlay(id) {
    setTodos((todos) => {
      const i = todos.findIndex((el) => el.id === id)
      return changeKeyInTodos(i, todos, 'startTime', new Date())
    })
  }

  function updateInterval(id, interval) {
    setTodos((todos) => {
      const i = todos.findIndex((el) => el.id === id)
      return changeKeyInTodos(i, todos, 'interval', interval)
    })
  }

  function onPause(id) {
    setTodos((todos) => {
      const i = todos.findIndex((el) => el.id === id)
      const intervalToSet = todos[i].interval || todos[i].intervalInMemory
      return changeKeyInTodos(i, todos, 'intervalInMemory', intervalToSet)
    })

    setTodos((todos) => {
      const i = todos.findIndex((el) => el.id === id)
      return changeKeyInTodos(i, todos, 'startTime', '')
    })
  }

  function onChangeMin(e) {
    const mins = e.target.value

    setCreatedMin(mins)
  }

  function onChangeSec(e) {
    const secs = e.target.value

    setCreatedSec(secs)
  }

  function validTime(time) {
    if (isNaN(time) || time > 59) return false

    if (time.toString().length === 1) {
      return `0${time}`
    } else {
      return time
    }
  }

  function findTodoIdx(id) {
    const i = todos.findIndex((el) => el.id === id)
    return i
  }

  function changeKeyInTodos(i, todos, keyToChange, newValue) {
    const oldItem = todos[i]
    const newItem = { ...oldItem, [keyToChange]: newValue }
    const newArr = [...todos.slice(0, i), newItem, ...todos.slice(i + 1)]
    return newArr
  }

  const doneCount = todos.filter((el) => el.done).length
  const tasksLeft = todos.length - doneCount

  // в window click listener не приходит текущий стейт. хз почему, на классах тоже странно работало, решила тогда проблему тем,
  // что не объявляла переменную как часть стейта, а писала this.state.dontSubmit -- только так работало
  // здесь через this.state не прокатит 🥴

  // window.addEventListener('click', (e) => {
  //   if (editing === 1 && !e.target.classList.contains('icon-edit') && !e.target.closest('.editing') && !dontSubmit) {
  //     // сабмитим изменения

  //     setEditedId(null)
  //     setDontSubmit((dontSubmit) => {
  //       if (dontSubmit == true) false
  //     })
  //     setEditing((editing) => {
  //       if (editing === 1) null
  //     })
  //   } else return
  // })

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm
          onTaskAdded={addItem}
          unable={!dontSubmit}
          onChangeMin={onChangeMin}
          onChangeSec={onChangeSec}
          editing={editing}
        />
      </header>
      <section className="main">
        <TaskList
          todos={todos}
          filter={filter}
          onDelete={deleteItem}
          onEdit={editItem}
          onToggleDone={onToggleDone}
          onEditing={editingItem}
          removeEditClass={removeEditClass}
          editedId={editedId}
          dontSubmit={dontSubmit}
          onPlay={onPlay}
          updateTodoInterval={updateInterval}
          onPause={onPause}
        />
        <Footer left={tasksLeft} onFilter={onFilter} onDeleteCompleted={deleteCompleted} />
      </section>
    </section>
  )
  // }
}

const elem = <App />

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)
root.render(elem)
