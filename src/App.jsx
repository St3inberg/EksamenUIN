
import './App.css'
import { Router, Route } from 'react-router-dom';
import Layout from '/conponents/Layout';
import Home from './components/Home';
import EventPages from './components/EventPages'


function App() {
 

  return (
    <>
    <Router>
      <Layout>
        <Route path={"/"}  element={<Home/>}></Route>
        <Route path={"/event/:id"}  element={<EventPages/>}></Route>
        <Route path={"/category/:slug"}  element={<ArktikkeKort/>}></Route>
        


      </Layout>
    </Router>
    
    </>
  )
}

export default App
