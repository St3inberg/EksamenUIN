import './App.css'
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout';
import Home from './components/home';
import EventPages from './components/EventPages'
import ArktikkeKort from './components/ArtikkelKort'


function App() {

  return (
    <><Layout>
    <Routes>
        <Route path={"/"}  element={<Home/>}></Route>
        <Route path={"/event/:id"}  element={<EventPages/>}></Route>
        <Route path={"/category/:slug"}  element={<ArktikkeKort/>}></Route>
    </Routes>
    </Layout>
    </>
  )
}

export default App
