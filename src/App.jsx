
import './App.css'
import { Router, Route } from 'react-router-dom'
import Layout from '/conponents/Layout'


function App() {
 

  return (
    <>
    <Router>
      <Layout>
        <Route path={"/"}  element={<Home/>}></Route>
        <Route path={"/event/:id"}  element={<EventPages/>}></Route>
<<<<<<< Updated upstream
        

=======
>>>>>>> Stashed changes

      </Layout>
    </Router>
    
    </>
  )
}

export default App
