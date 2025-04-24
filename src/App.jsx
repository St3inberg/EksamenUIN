import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Router } from 'react-router-dom'
import Layout from '/conponents/Layout'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Layout>
        <Route path={"/"}  element={<Home/>}></Route>
        <Route path={"/event/:id"}  element={<EventPages/>}></Route>
        


      </Layout>
    </Router>
    
    </>
  )
}

export default App
