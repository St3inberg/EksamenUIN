import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Layout from './components/layout/Layout';
import Dashboard from './components/Dashboard';
import CategoryPage from './components/CategoryPage';
import SanityEventDetails from './components/SanityEventDetails';
import ImportCategoryEvents from './components/ImportCategoryEvents';

const App = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/kategori/:slug" element={<CategoryPage />} />
      <Route path="/sanity-event/:slug" element={<SanityEventDetails />} />
      <Route path="/import-events" element={<ImportCategoryEvents />} />
    </Routes>
  </Layout>
);

export default App;
