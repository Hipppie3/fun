import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home.jsx';
import Navbar from './components/Navbar.jsx';
import Food from './pages/Food.jsx';
import Entertainment from './pages/Entertainment.jsx';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/food' element={<Food />} />
        <Route path='/entertainment' element={<Entertainment />} />
      </Routes>
    </div>
  )
}

export default App
