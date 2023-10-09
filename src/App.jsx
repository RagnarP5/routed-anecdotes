import { useState } from 'react'
import {
    BrowserRouter as Router,
    Routes, Route, Link, Navigate
} from "react-router-dom";
import Footer from './components/Footer.jsx'
import Menu from './components/Menu.jsx'
import AnecdoteList from "./components/AnecdoteList.jsx";
import About from './components/About.jsx'
import CreateNew from "./components/CreateNew.jsx";
import Anecdote from "./components/Anecdote.jsx";
import Notification from "./components/Notification.jsx";

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`${anecdote.content} created successfully`)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
      <Router>
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Routes>
        <Route path="/about" element={<About/>}/>
        <Route path="/" element={<div><Notification message={notification}/> <AnecdoteList anecdotes={anecdotes}/></div>}/>
        <Route path="/anecdotes" element={<AnecdoteList anecdotes={anecdotes}/> }/>
        <Route path="/create-new" element={notification ? <Navigate replace to='/'/> : <CreateNew addNew={addNew}/>}/>
        <Route path="/anecdotes/:id" element={<Anecdote anecdotes={anecdotes}/> }/>
      </Routes>
      <Footer />
    </div>
      </Router>
  )
}

export default App
