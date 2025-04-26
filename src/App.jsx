
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Nav from './components/nav'
import Layout from './components/layout'
import Home from "./components/home";
import EventPages from "./components/EventPages";
function App() {
 

  return (
    <Layout element={<Home />}>
    <Routes>
      <Route path=":slug" elements={ <EventPages/>}/>
    </Routes>
    </Layout>

    

  )
}

export default App
