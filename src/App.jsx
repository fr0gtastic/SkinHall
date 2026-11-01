import { Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import ScrollToTop from './components/ScrollToTop';
import Catalog from '@/pages/Catalog';
import SkinDetail from '@/pages/SkinDetail';
import Stats from '@/pages/Stats';
import Guide from '@/pages/Guide';
import Footer from './components/Footer';
import ThemeSelector from './components/ThemeSelector';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <div className="sm:static absolute top-0 right-0 z-50 flex w-full items-center justify-end gap-2 border-b border-white/5 bg-transparent backdrop-blur-sm px-4 py-4 sm:px-8 sm:py-6">
        <ThemeSelector />
      </div>
      <Routes>
        <Route path="/" element={<Catalog />} />
        <Route path="/skin/:id" element={<SkinDetail />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  );
}
