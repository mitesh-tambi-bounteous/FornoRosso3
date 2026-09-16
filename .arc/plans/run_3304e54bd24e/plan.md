summary: |
  The repository is currently greenfield: only a placeholder README and env file exist, with no
  application scaffold, framework, or test runner set up yet. This plan bootstraps a minimal
  Vite + React + TypeScript front end with Vitest + React Testing Library, then implements a
  static `Footer` component that surfaces kitchen hours, address, contact details, and
  social/legal links, sourced from a single typed content/config module so the displayed values
  are guaranteed to match the pizzeria's actual published details (AC2). The footer is built
  test-first against jsdom for content-visibility assertions and against a real link/anchor
  contract for navigation (AC3), plus CSS authored with a mobile-first, no-truncation layout
  verified at a 320px viewport (AC4, AC5). This is scoped strictly to the footer; no other part
  of the home page (hero, carousel, brand story) is touched.

scope:
  - description: |
      Bootstrap the minimal project scaffold needed to write and run tests: Vite + React +
      TypeScript app skeleton, Vitest + React Testing Library + jsdom test environment, and an
      npm script to run tests.
    files:
      - package.json
      - vite.config.ts
      - vitest.config.ts (or test config merged into vite.config.ts)
      - tsconfig.json
      - index.html
      - src/main.tsx
      - src/App.tsx
      - src/setupTests.ts
    rationale: |
      No build tooling or test runner exists in the repo yet (only README.md and .env are
      present). A test-first plan requires a runnable test harness before any footer test can be
      written or fail meaningfully.
  - description: |
      Add a single typed content/config module holding the pizzeria's real, static footer data
      (kitchen hours, address, phone/email, social links, legal links) so the footer component
      and its tests both read from the same source of truth, satisfying AC2 by construction.
    files:
      - src/content/footerContent.ts
    rationale: |
      Centralizing the data avoids hardcoding duplicate strings in the component and the test,
      and gives the reviewer one place to confirm the values match the real pizzeria details
      before sign-off (see open question below on the authoritative source for these values).
  - description: |
      Implement the `Footer` React component that renders hours, address, contact info, and two
      link groups (social, legal) from `footerContent.ts`, with semantic markup (`<footer>`,
      `<address>`, lists of `<a>` tags with `href` set to each link's configured URL).
    files:
      - src/components/Footer/Footer.tsx
      - src/components/Footer/Footer.module.css (or Footer.css)
    rationale: |
      A single presentational component is sufficient; the footer has no interactive state, so
      no hooks/store are needed.
  - description: |
      Mount `Footer` inside `App.tsx` (or the page root) so it renders on the home page, per the
      parent epic's static-footer requirement.
    files:
      - src/App.tsx
    rationale: |
      AC1 requires the footer to be visible when a visitor scrolls the page, which means it must
      actually be composed into the page tree, not just exist as an orphaned component.
  - description: |
      Author mobile-first CSS ensuring no truncation/clipping and no horizontal overflow at a
      320px viewport (flex/grid column stacking, `word-break`/`overflow-wrap` on long address/
      contact strings, `max-width: 100vw` / no fixed pixel widths wider than 320px).
    files:
      - src/components/Footer/Footer.module.css
    rationale: |
      AC4 and AC5 are layout requirements that unit tests can only partially verify (jsdom does
      not lay out CSS); the CSS itself is the "minimal code" for these two ACs, checked by an
      explicit viewport-driven test using `getBoundingClientRect`/`scrollWidth` comparisons plus
      manual verification.

tests:
  - |
    AC1 — footer renders all five content categories.
    File: src/components/Footer/Footer.test.tsx
    Failing test first:
    ```tsx
    import { render, screen } from '@testing-library/react';
    import { Footer } from './Footer';
    import { footerContent } from '../../content/footerContent';

    test('renders hours, address, contact, social links, and legal links', () => {
      render(<Footer />);
      expect(screen.getByText(footerContent.hours.display)).toBeInTheDocument();
      expect(screen.getByText(footerContent.address.display)).toBeInTheDocument();
      expect(screen.getByText(footerContent.contact.phoneDisplay)).toBeInTheDocument();
      footerContent.socialLinks.forEach(link =>
        expect(screen.getByRole('link', { name: link.label })).toBeInTheDocument()
      );
      footerContent.legalLinks.forEach(link =>
        expect(screen.getByRole('link', { name: link.label })).toBeInTheDocument()
      );
    });
    ```
    Minimal code to pass: render each field from `footerContent` inside `<Footer>` with matching
    visible text/labels. Fails first because neither `Footer.tsx` nor `footerContent.ts` exist.
  - |
    AC2 — displayed values match the pizzeria's actual published details.
    File: src/components/Footer/Footer.test.tsx
    Failing test first:
    ```tsx
    test('displays the exact configured hours, address, and contact details', () => {
      render(<Footer />);
      expect(screen.getByText('Mon–Sun: 11:00 AM – 10:00 PM')).toBeInTheDocument();
      expect(screen.getByText('123 Forno Rosso Way, Springfield, ST 00000')).toBeInTheDocument();
      expect(screen.getByText('(555) 123-4567')).toBeInTheDocument();
    });
    ```
    Minimal code to pass: populate `footerContent.ts` with the reviewer-confirmed real strings
    (see open question) and render them verbatim. This test is a content-accuracy gate, not a
    structural one, so it asserts on literal strings rather than the config re-import.
  - |
    AC3 — clicking a social/legal link navigates to its configured destination URL.
    File: src/components/Footer/Footer.test.tsx
    Failing test first:
    ```tsx
    test('each social and legal link has the correct href', () => {
      render(<Footer />);
      footerContent.socialLinks.forEach(link => {
        expect(screen.getByRole('link', { name: link.label })).toHaveAttribute('href', link.url);
      });
      footerContent.legalLinks.forEach(link => {
        expect(screen.getByRole('link', { name: link.label })).toHaveAttribute('href', link.url);
      });
    });
    ```
    Minimal code to pass: render `<a href={link.url}>{link.label}</a>` for every entry in
    `socialLinks`/`legalLinks`; external links additionally get `target="_blank"
    rel="noopener noreferrer"`. jsdom does not perform real navigation, so asserting the `href`
    attribute is the correct-fidelity check for "the browser navigates to that link's configured
    destination URL."
  - |
    AC4 — footer content remains readable without truncation/clipping at 320px width.
    File: src/components/Footer/Footer.responsive.test.tsx
    Failing test first:
    ```tsx
    test('no footer text node is clipped by overflow at 320px viewport', () => {
      window.innerWidth = 320;
      const { container } = render(<Footer />);
      const footerEl = container.querySelector('footer') as HTMLElement;
      expect(footerEl.scrollWidth).toBeLessThanOrEqual(320);
    });
    ```
    Minimal code to pass: mobile-first CSS with column stacking, `overflow-wrap: anywhere` on
    long text, and no elements with fixed widths exceeding 320px. Note jsdom does not compute
    real layout/CSS, so this test is a structural smoke check only; final confirmation requires
    manual verification in a real browser at 320px (documented in `notes`).
  - |
    AC5 — footer layout does not overflow the viewport at 320px width.
    File: src/components/Footer/Footer.responsive.test.tsx
    Failing test first:
    ```tsx
    test('footer root has no explicit width wider than the viewport', () => {
      const { container } = render(<Footer />);
      const footerEl = container.querySelector('footer') as HTMLElement;
      expect(footerEl).toHaveStyle({ maxWidth: '100%' });
    });
    ```
    Minimal code to pass: set `max-width: 100%; box-sizing: border-box;` on the footer's root
    element in `Footer.module.css`, and avoid any descendant with a fixed pixel width greater
    than 320px. As with AC4, pair this with a manual/browser-based 320px check since jsdom cannot
    fully validate overflow.

assumptions_or_open_questions:
  - "No package manager manifest, framework, or test runner exists in the repo yet — this plan assumes Vite + React + TypeScript + Vitest + React Testing Library is an acceptable default stack for the home page. If a different stack/framework is intended for FornoRosso3, please say so before implementation starts."
  - "The parent epic mentions hero, value props, carousel, and brand story sections that don't exist yet either. This plan creates only the minimal `App.tsx` shell needed to mount the footer, not those other sections."
  - "The exact real values for kitchen hours, address, phone/email, and the specific social/legal link URLs are not present anywhere in the repo or provided context. This plan uses placeholder values in `footerContent.ts` that MUST be replaced with the pizzeria's actual confirmed details before/at implementation time — this is a hard blocker for AC2 specifically and should be confirmed by the reviewer."
  - "AC4/AC5 are layout assertions; jsdom-based Vitest tests can only check structural proxies (scrollWidth, computed max-width), not real browser layout. Manual verification at a 320px viewport in an actual browser (or a screenshot-based visual test) is recommended as a supplementary check, but is not automated in this plan to avoid introducing a new visual-regression tool without explicit approval."
  - "Assumed CSS Modules (`Footer.module.css`) for styling since no existing styling convention (Tailwind, styled-components, plain CSS) exists in the repo to follow."

package_dependencies:
  - name: react
    version: ^18.3.1
    ecosystem: npm
    rationale: Core UI library for building the Footer component and page shell; nothing in the repo currently provides a rendering framework.
  - name: react-dom
    version: ^18.3.1
    ecosystem: npm
    rationale: Required alongside react to render components into the DOM.
  - name: vite
    version: ^5.4.0
    ecosystem: npm
    rationale: Lightweight, fast dev server/bundler to scaffold the app; no build tool exists yet.
  - name: "@vitejs/plugin-react"
    version: ^4.3.0
    ecosystem: npm
    rationale: Enables JSX/TSX compilation for React within Vite.
  - name: typescript
    version: ^5.5.0
    ecosystem: npm
    rationale: Type-safe content config (`footerContent.ts`) and component props.
  - name: vitest
    version: ^2.0.0
    ecosystem: npm
    rationale: Test runner for the test-first workflow; no test runner currently exists in the repo.
  - name: "@testing-library/react"
    version: ^16.0.0
    ecosystem: npm
    rationale: Render and query the Footer component in tests by accessible role/text, per the ACs.
  - name: "@testing-library/jest-dom"
    version: ^6.4.0
    ecosystem: npm
    rationale: Provides `toBeInTheDocument`/`toHaveAttribute`/`toHaveStyle` matchers used in the test snippets above.
  - name: jsdom
    version: ^24.1.0
    ecosystem: npm
    rationale: DOM environment for Vitest so component tests can render and query HTML without a real browser.

notes: |
  This work item lands in a repository with no prior application code — `git log` shows a single
  "first commit" containing only `README.md` and `.env`. There is therefore no existing
  component/folder convention, styling approach, or test setup to mirror; the scaffold choices
  above (Vite/React/TS/Vitest/RTL) are a conventional, low-risk default for a marketing landing
  page and are called out explicitly in `assumptions_or_open_questions` for reviewer sign-off
  before implementation begins.

  No mermaid diagram is included: this is a new, purely-additive feature in a greenfield repo
  with a single component (`Footer`) mounted into a single new page shell (`App.tsx`) — there is
  no existing module graph to show fan-in/fan-out against.

  Suggested TDD sequence:
  1. Scaffold project + test runner (no tests yet, just confirm `npm test` runs and reports 0
     tests).
  2. Write and run the AC1 test — fails (no Footer/content module).
  3. Create `footerContent.ts` with placeholder-then-confirmed real data and a minimal
     `Footer.tsx` — AC1 test passes.
  4. Write AC2 test with literal expected strings — passes once real content is confirmed and
     wired in.
  5. Write AC3 href test — passes once anchors are wired to `link.url`.
  6. Write AC4/AC5 responsive smoke tests — pass once mobile-first CSS is authored; supplement
     with a manual 320px browser check.
  7. Mount `<Footer />` in `App.tsx` and do a final manual pass in a real browser at 320px width
     to confirm no visual truncation/overflow, since jsdom cannot fully validate this.
