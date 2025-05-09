import { Outlet }  from 'react-router-dom';
import Layout from './components/layout/Layout';

export default function App(){
  return(
    
    <Layout>
      <Outlet></Outlet>
    </Layout>


  )

}