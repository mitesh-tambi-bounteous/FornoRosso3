summary: |
  The repository is currently empty (only a README, .env, and .arc metadata exist — no
  package.json, no src/, no existing components). This plan scaffolds a minimal React +
  TypeScript + Vite frontend and implements the homepage's "Popular Pizzas" section: a
  hardcoded, curated list of pizzas rendered as a responsive CSS-grid of cards (name, price,
  description, "Add to Order" button), plus a minimal Header with a cart-count badge fed by a
  lightweight client-side CartContext. Every acceptance criterion is covered by a Vitest +
  React Testing Library test written before the corresponding implementation code. No backend,
  persistence, toast/modal library, or dynamic pizza sourcing is introduced — the grid is a pure,
  static, client-side rendering + client-side cart-count increment, matching the ACs exactly.

scope:
  - description: |
      Scaffold the frontend project: package.json, tsconfig.json, vite.config.ts,
      vitest.config.ts (or vitest config inside vite.config.ts), index.html, src/main.tsx,
      src/App.tsx, and a test setup file wiring jest-dom matchers into Vitest.
    files:
      - package.json
      - tsconfig.json
      - vite.config.ts
      - index.html
      - src/main.tsx
      - src/App.tsx
      - src/setupTests.ts
    rationale: |
      There is no existing app to attach the feature to — this is the first work item building
      any source code in this repo, so the runnable/testable app shell must exist before any
      component can be written or tested.

  - description: |
      Add a hardcoded, curated pizza dataset as a typed constant module (no fetch, no API call).
      `export const CURATED_PIZZAS: Pizza[]` with a fixed-length array (e.g. 6 items), each
      `{ id: string; name: string; price: number; description: string }`.
    files:
      - src/data/pizzas.ts
    rationale: |
      AC5 requires the list to be hardcoded/static with no dynamic or algorithmic sourcing —
      isolating it in one module makes that assertion directly testable and keeps it the single
      source of truth for both the grid and its tests.

  - description: |
      Add a minimal CartContext/CartProvider exposing `{ count: number; addItem: () => void }`
      via `useCart()`, incrementing `count` by 1 per `addItem()` call, held in React state only
      (no persistence, no backend call).
    files:
      - src/context/CartContext.tsx
    rationale: |
      AC3 requires a header badge to increment when "Add to Order" is clicked; the button (in a
      pizza card) and the badge (in the header) are siblings, so they need a shared state source
      rather than prop drilling across the page.

  - description: |
      Add a `Header` component rendering a cart badge bound to `useCart().count`, e.g.
      `<span data-testid="cart-count">{count}</span>` starting at 0.
    files:
      - src/components/Header.tsx
    rationale: |
      AC3 explicitly references "the cart item count in the header badge" — this component is
      the target of that assertion and did not exist before this story.

  - description: |
      Add a `PizzaCard` component rendering name, price (formatted, e.g. `$12.50`), description,
      and an "Add to Order" button that calls `useCart().addItem()` and renders no toast/modal
      (no conditional confirmation UI at all — the click handler does nothing but call
      `addItem`).
    files:
      - src/components/PizzaCard.tsx
    rationale: |
      Directly implements AC2 (name/price/description visible) and AC4 (no confirmation UI on
      click) at the smallest testable unit.

  - description: |
      Add a `PopularPizzasGrid` component that maps `CURATED_PIZZAS` to `PizzaCard`s inside a
      CSS Grid container (`display: grid; grid-template-columns: repeat(auto-fill, minmax(...))`),
      with no carousel library, no `overflow-x`, and no prev/next controls.
    files:
      - src/components/PopularPizzasGrid.tsx
      - src/components/PopularPizzasGrid.module.css
    rationale: |
      Implements AC1 (all cards visible, no carousel/scroll) and AC6 (reflow via CSS grid
      auto-fill instead of fixed columns, so cards wrap instead of clipping at narrow widths).

  - description: |
      Compose `Header` + `PopularPizzasGrid` inside a single `CartProvider` in the app root
      (`src/App.tsx` or a `src/pages/Home.tsx` rendered by it).
    files:
      - src/App.tsx
      - src/pages/Home.tsx
    rationale: |
      Wires the shared cart state so a click in the grid is observable in the header, matching
      how AC3 will actually be exercised by an end-to-end-style component test.

tests:
  - |
    AC1 — grid renders all curated cards, no carousel controls, no horizontal scroll:
    `src/components/PopularPizzasGrid.test.tsx`
    ```ts
    import { render, screen } from '@testing-library/react';
    import { PopularPizzasGrid } from './PopularPizzasGrid';
    import { CURATED_PIZZAS } from '../data/pizzas';

    it('renders every curated pizza card with no carousel controls', () => {
      render(<PopularPizzasGrid />);
      CURATED_PIZZAS.forEach((pizza) => {
        expect(screen.getByText(pizza.name)).toBeInTheDocument();
      });
      expect(screen.queryByRole('button', { name: /next/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /previous/i })).not.toBeInTheDocument();
      const container = screen.getByTestId('popular-pizzas-grid');
      expect(container.className).not.toMatch(/carousel|scroll-x|nowrap/i);
    });
    ```
    This test must fail first because `PopularPizzasGrid` does not exist yet.

  - |
    AC2 — card shows name, price, description:
    `src/components/PizzaCard.test.tsx`
    ```ts
    import { render, screen } from '@testing-library/react';
    import { PizzaCard } from './PizzaCard';

    const pizza = { id: 'margherita', name: 'Margherita', price: 12.5, description: 'Tomato, mozzarella, basil' };

    it('shows name, price, and description', () => {
      render(<PizzaCard pizza={pizza} />);
      expect(screen.getByText('Margherita')).toBeInTheDocument();
      expect(screen.getByText('$12.50')).toBeInTheDocument();
      expect(screen.getByText('Tomato, mozzarella, basil')).toBeInTheDocument();
    });
    ```

  - |
    AC3 — clicking "Add to Order" increments the header badge by 1:
    `src/App.test.tsx` (integration test wiring Header + one PizzaCard under a shared CartProvider)
    ```ts
    import { render, screen } from '@testing-library/react';
    import userEvent from '@testing-library/user-event';
    import { CartProvider } from '../context/CartContext';
    import { Header } from '../components/Header';
    import { PizzaCard } from '../components/PizzaCard';

    const pizza = { id: 'margherita', name: 'Margherita', price: 12.5, description: 'x' };

    it('increments the header cart badge when Add to Order is clicked', async () => {
      render(
        <CartProvider>
          <Header />
          <PizzaCard pizza={pizza} />
        </CartProvider>
      );
      expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
      await userEvent.click(screen.getByRole('button', { name: /add to order/i }));
      expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
    });
    ```

  - |
    AC4 — no toast/modal confirmation appears after clicking "Add to Order":
    extend `src/components/PizzaCard.test.tsx`
    ```ts
    it('shows no toast or modal confirmation after Add to Order is clicked', async () => {
      render(<PizzaCard pizza={pizza} />);
      await userEvent.click(screen.getByRole('button', { name: /add to order/i }));
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      expect(screen.queryByText(/added to (your )?order/i)).not.toBeInTheDocument();
    });
    ```

  - |
    AC5 — only the hardcoded curated list is shown; no dynamic/network sourcing:
    `src/data/pizzas.test.ts` + extend `PopularPizzasGrid.test.tsx`
    ```ts
    // src/data/pizzas.test.ts
    import { CURATED_PIZZAS } from './pizzas';

    it('is a fixed, non-empty hardcoded list', () => {
      expect(Array.isArray(CURATED_PIZZAS)).toBe(true);
      expect(CURATED_PIZZAS.length).toBe(6);
    });
    ```
    ```ts
    // PopularPizzasGrid.test.tsx addition
    it('never calls fetch to source pizzas', () => {
      const fetchSpy = vi.spyOn(global, 'fetch');
      render(<PopularPizzasGrid />);
      expect(fetchSpy).not.toHaveBeenCalled();
    });
    ```

  - |
    AC6 — cards reflow with no clipping at any viewport width:
    extend `src/components/PopularPizzasGrid.test.tsx`
    ```ts
    it('uses a reflowing CSS grid, never a fixed column count or clipped overflow', () => {
      render(<PopularPizzasGrid />);
      const container = screen.getByTestId('popular-pizzas-grid');
      const styles = getComputedStyle(container);
      expect(styles.display).toBe('grid');
      expect(styles.overflowX).not.toBe('scroll');
    });
    ```
    Note: jsdom does not evaluate real media queries or true reflow layout, so this test only
    asserts the mechanism (CSS grid with auto-fill/minmax, no overflow-x scroll) rather than
    pixel-level reflow; true cross-viewport verification requires a manual/visual check called
    out under assumptions below.

assumptions_or_open_questions:
  - "The repository has no existing frontend framework, so this plan chooses React + TypeScript + Vite as a minimal, conventional stack. If the team has already standardized on a different framework for the rest of the site, this scaffold should be reconciled with that choice before merging."
  - "Cart state is treated as client-side/in-memory only for this story (no persistence, no backend endpoint) since no AC references a server-side cart or reload persistence."
  - "The 'Header' built here is a minimal component containing only the cart badge, not the full site navigation — full header/nav is assumed to belong to a separate homepage story per the parent epic."
  - "Price is assumed to be a plain number formatted as USD (e.g. `$12.50`); currency/locale requirements were not specified in the ACs."
  - "AC6's 'no clipping' and responsive reflow cannot be fully verified by jsdom-based unit tests (no real layout engine); this plan covers the CSS mechanism via unit tests and flags a manual/browser check as a follow-up verification step, not an automated one."
  - "The curated pizza list size (6 items) is an assumption for the initial dataset; the exact items/count should come from content/design and can be adjusted without changing the grid/card components."

package_dependencies:
  - name: react
    version: ^18.3.1
    ecosystem: npm
    rationale: Core UI library for the homepage components (Header, PizzaCard, PopularPizzasGrid) — nothing in the repo currently depends on it.
  - name: react-dom
    version: ^18.3.1
    ecosystem: npm
    rationale: Required alongside react to render the app into the DOM.
  - name: typescript
    version: ^5.6.2
    ecosystem: npm
    rationale: Plan specifies typed components/data (Pizza type, CartContext types).
  - name: vite
    version: ^5.4.8
    ecosystem: npm
    rationale: Dev server/build tool for the scaffolded app; ARC_DEV_PORT/ARC_WEB_PORT in .env imply a dev server is expected.
  - name: "@vitejs/plugin-react"
    version: ^4.3.2
    ecosystem: npm
    rationale: Enables JSX/Fast Refresh support for React inside Vite.
  - name: vitest
    version: ^2.1.2
    ecosystem: npm
    rationale: Test runner for the test-first plan, integrates natively with the Vite config already being added.
  - name: "@testing-library/react"
    version: ^16.0.1
    ecosystem: npm
    rationale: Renders components and queries by role/text for every test listed above.
  - name: "@testing-library/jest-dom"
    version: ^6.5.0
    ecosystem: npm
    rationale: Provides toBeInTheDocument/toHaveTextContent matchers used throughout the tests.
  - name: "@testing-library/user-event"
    version: ^14.5.2
    ecosystem: npm
    rationale: Simulates the "Add to Order" click in AC3/AC4 tests more realistically than fireEvent.
  - name: jsdom
    version: ^25.0.1
    ecosystem: npm
    rationale: DOM environment required by Vitest to render React components and read computed styles in tests.

notes: |
  Research finding: the worktree contains no package.json, no src/, and no prior commits beyond
  the initial "first commit" (README + .env only) — reconfirmed via file listing on this pass
  (unchanged since the last revision). This is genuinely a from-scratch build for this story, not
  a refactor of existing homepage code, so the scope above includes minimal scaffolding rather
  than only feature code.

  Because this plan spans several new files with a clear layering (data -> components -> app
  composition), a flowchart is included below covering only the modules this plan actually
  creates and how they call each other.

  ```mermaid
  flowchart TD
    classDef touched fill:#f96,color:#000

    App[App.tsx / Home.tsx]:::touched
    CartProvider[CartContext.tsx]:::touched
    Header[Header.tsx]:::touched
    Grid[PopularPizzasGrid.tsx]:::touched
    Card[PizzaCard.tsx]:::touched
    Data[data/pizzas.ts]:::touched

    App -->|wraps tree in CartProvider so Header and Card share cart state| CartProvider
    App -->|renders| Header
    App -->|renders| Grid
    Grid -->|maps hardcoded list, AC5| Data
    Grid -->|renders one per pizza, AC1/AC6| Card
    Card -->|reads/writes cart count via useCart, AC3| CartProvider
    Header -->|reads cart count via useCart, AC3| CartProvider
  ```
