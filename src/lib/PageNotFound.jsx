import { Link, useLocation } from 'react-router-dom';

export default function PageNotFound() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-7xl font-light text-muted-foreground">404</h1>
        <p className="text-muted-foreground">
          The page <span className="font-medium text-foreground">"{pathname.substring(1)}"</span> could not be found.
        </p>
        <Link to="/" className="inline-flex items-center px-4 py-2 text-sm font-medium border border-border rounded-lg hover:bg-card transition-colors">
          Back to catalog
        </Link>
      </div>
    </div>
  );
}
