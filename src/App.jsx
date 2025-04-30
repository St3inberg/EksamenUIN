
import './App.css'
import { Router, Route } from 'react-router-dom';
import Layout from './components/layout';
import Home from './components/home';
import EventPages from './components/EventPages'
import ArktikkeKort from './components/ArtikkelKort'


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
