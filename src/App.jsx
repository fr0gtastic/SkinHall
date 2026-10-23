import { Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import ScrollToTop from './components/ScrollToTop';
import Catalog from '@/pages/Catalog';
import SkinDetail from '@/pages/SkinDetail';
import Footer from './components/Footer';
import ThemeSelector from './components/ThemeSelector';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <div className="sticky top-0 z-50 flex justify-end px-5 py-2 bg-background/80 backdrop-blur">
        <ThemeSelector />
      </div>
      <Routes>
        <Route path="/" element={<Catalog />} />
        <Route path="/skin/:id" element={<SkinDetail />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  );
}
