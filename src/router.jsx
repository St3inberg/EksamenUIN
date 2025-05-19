import Home from './components/pages/Home';
import EventPage from './components/pages/EventPage';
import AttractionPage from './components/pages/AttractionPage';
import CategoryPage from './components/pages/CategoryPage';
import Dashboard from './components/pages/Dashboard';
import SanityEventDetails from './components/pages/SanityEventDetails';
import {Route, Routes} from 'react-router-dom';
import Layout from './components/layout/Layout';

export default function Router() {  return (
    <Layout>
      <Routes>
        <Route index element={<Home />} />
        <Route path="event/:id" element={<EventPage />} />
        <Route path="attraction/:id" element={<AttractionPage />} />
        <Route path="category/:slug" element={<CategoryPage />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="sanity-event/:id" element={<SanityEventDetails />} />
      </Routes>
    </Layout>
  );
}
