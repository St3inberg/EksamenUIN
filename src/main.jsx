import { BrowserRouter} from 'react-router-dom';
import {createRoot} from 'react-dom/client';
import './scss/main.scss';
import Router from './router.jsx';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './hooks/useAuth';

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <WishlistProvider>
        <Router/>  
      </WishlistProvider>
    </AuthProvider>
  </BrowserRouter>
)

