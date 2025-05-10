import { BrowserRouter} from 'react-router-dom';
import {createRoot} from 'react-dom/client';

import Router from './router.jsx'





createRoot(document.getElementById("root")).render(
  
    <BrowserRouter>
      <Router/>  
    </BrowserRouter>
  

)

