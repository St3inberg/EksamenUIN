import Home from './pages/Home';
import EventPage from './pages/EventPage'
import CategoryPage from './pages/CategoryPage';
import Dashboard from './pages/DashBoard';
import SanityEventDetails from './pages/SanityEventDetails';
import App from './App';
import {Route, Routes} from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Layout from './components/layout/Layout';

export default function Router(){
    
    return(

<Layout
>
        <Routes path="/" element={<App />}>
              <Route index element={<Home />} />
              <Route path="event/:id" element={<EventPage />} />
              <Route path="category/:slug" element={<CategoryPage />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="sanity-event/:id" element={<SanityEventDetails />} />
            </Routes>
</Layout>




    )

}
