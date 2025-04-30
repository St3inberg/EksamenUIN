
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/home'
import Layout from './components/layout'
import DashBoard from './components/dashBoard'
import KategoriSide from './components/KategoriSide'



function App() {
 

  return (
    
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:dashboard" element={<DashBoard />} />
        <Route path="/kategori/:slug" element={<KategoriSide />} />
      </Routes>
      </Layout>
  
  )
}

export default App
