import { Header } from '../components/Header';
import { PopularPizzasGrid } from '../components/PopularPizzasGrid';

export function Home() {
  return (
    <>
      <Header />
      <main>
        <PopularPizzasGrid />
      </main>
    </>
  );
}
