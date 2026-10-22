import { Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import ScrollToTop from './components/ScrollToTop';
import Catalog from '@/pages/Catalog';
import SkinDetail from '@/pages/SkinDetail';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Catalog />} />
        <Route path="/skin/:id" element={<SkinDetail />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  );
}
