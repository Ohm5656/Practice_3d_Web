# AeroChron

A luxury watch microsite built with `Next.js`, designed around premium product storytelling. The project includes a landing page, collection page, product detail page, cart, and a frontend-only checkout flow.

This project focuses heavily on motion and presentation, using scroll-driven canvas sequences, smooth scrolling, product card interactions, and a luxury dark visual style.

## Highlights

- Cinematic landing page with a full-screen hero and reveal animations powered by `Framer Motion`
- Scroll-driven product showcase rendered through `<canvas>` using frame sequences from `public/product`
- Store page with multiple product models, `Buy` actions, and a fly-to-cart animation
- Shared cart state via `CartContext`, persisted in `localStorage` under the `aerochron_cart` key
- Multi-step checkout flow (`Cart`, `Shipping`, `Payment`) for a polished purchase demo
- Supporting `About` and `Contact` pages to make the microsite feel complete as a portfolio or concept project
- Smooth scrolling with `Lenis` and a global luxury theme built with `Tailwind CSS 4`

## Tech Stack

- `Next.js 16`
- `React 19`
- `TypeScript`
- `Tailwind CSS 4`
- `Framer Motion`
- `Lenis`

## Main Routes

- `/` brand landing page
- `/store` full product collection
- `/store/[id]` dynamic product detail page
- `/checkout` cart and checkout flow
- `/about` brand story page
- `/contact` contact page

## Installation and Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

Additional commands:

```bash
npm run lint
npm run build
npm run start
```

## Project Structure

```text
app/
  about/
  checkout/
  contact/
  store/
  context/CartContext.tsx
components/
  Navbar.tsx
  Footer.tsx
  StoreSection.tsx
  ProductSequence.tsx
  SequenceSection.tsx
  LenisProvider.tsx
hooks/
  useCanvasSequence.ts
public/
  images/
  product/
  Hero/
```

## How the 3D / Sequence Experience Works

The core visual effect is driven by `hooks/useCanvasSequence.ts` and `components/SequenceSection.tsx`.

- `SequenceSection` uses `Framer Motion`'s `useScroll` to convert scroll position into normalized progress
- `useCanvasSequence` preloads image frames in batches and draws them onto a `<canvas>` based on that progress
- `ProductSequence` uses the same progress value to synchronize both the frame animation and the text overlays

This approach works well for immersive product storytelling, premium hero sections, and 3D-like presentation without requiring WebGL.

## Current Project Status

This is a frontend demo that is already strong for UI/UX presentation, but it is not yet connected to a real backend.

- No backend, database, or CMS is connected yet
- Product data is currently stored as static data inside page and component files
- The `Contact` page is currently a UI-only form and does not submit data
- The `Checkout` page is a mock purchase flow and is not connected to a payment gateway
- The `Add to Bag` button on product detail pages is currently visual only and is not wired into the cart like the `Buy` button on the store page

## Good Use Cases

- A frontend or creative developer portfolio project
- A starting point for a luxury product landing page
- A base for an e-commerce experience with strong motion and visual storytelling
- A reference for building scroll-based canvas animation in `Next.js`

## Notes

If you want to push this project toward production, a good next step would be separating product data from UI code, adding an API layer, connecting real checkout/payment logic, and improving analytics and asset optimization.
