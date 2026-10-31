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
      <div className="sm:static absolute top-0 right-0 z-50 flex items-center justify-end gap-2 px-5 py-2 sm:bg-background/80 sm:backdrop-blur bg-transparent">
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
