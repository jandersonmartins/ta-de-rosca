import React from 'react'
import './App.css'
import SpeedTestList from './SpeedTestList'

const App = () => (
  <div>
    <header>
      <a
        href="https://github.com/jandersonmartins/ta-de-rosca"
        target="_blank"
        rel="noopener noreferrer"
      >
        Ta de Rosca o.o
      </a>
    </header>

    <main>
      <SpeedTestList />
    </main>
  </div>
)

export default App
