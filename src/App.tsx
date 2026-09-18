import { Footer } from './components/Footer/Footer';
import { ComingSoon } from './pages/ComingSoon';
import { footerContent } from './content/footerContent';

const comingSoonRoutes = new Set([
  ...footerContent.legalLinks.map(link => link.url),
]);

export function App() {
  if (comingSoonRoutes.has(window.location.pathname)) {
    return <ComingSoon />;
  }

  return (
    <div className="App">
      <Footer />
    </div>
  );
}
