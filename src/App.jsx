import { Route, Routes, Link } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import ScrollToTop from './components/ScrollToTop';
import Catalog from '@/pages/Catalog';
import SkinDetail from '@/pages/SkinDetail';
import Stats from '@/pages/Stats';
import Footer from './components/Footer';
import ThemeSelector from './components/ThemeSelector';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <div className="sm:static absolute top-0 right-0 z-50 flex items-center justify-end gap-2 px-5 py-2 sm:bg-background/80 sm:backdrop-blur bg-transparent">
        <Link
          to="/stats"
          className="font-display text-[11px] uppercase tracking-[0.14em] text-foreground/70 transition-colors hover:text-primary"
        >
          Stats
        </Link>
        <ThemeSelector />
      </div>
      <Routes>
        <Route path="/" element={<Catalog />} />
        <Route path="/skin/:id" element={<SkinDetail />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  );
}
