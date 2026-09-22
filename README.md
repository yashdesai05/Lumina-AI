# Lumina AI — Premium AI SaaS Template

Thank you for purchasing **Lumina AI**! This document covers everything you
need to install, run, and customize the template for your own product.

Built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**,
**Framer Motion**, and **Lucide Icons**.

---

## 1. What's Included

```
lumina-ai/
├── app/
│   ├── layout.tsx                # Root layout — fonts, metadata, <html> shell
│   ├── page.tsx                  # Landing page (Home)
│   ├── globals.css               # Tailwind base + custom utility classes
│   └── dashboard/
│       ├── layout.tsx            # Dashboard shell (Sidebar + content area)
│       └── page.tsx              # AI Chat interface page
│
├── components/
│   ├── landing/
│   │   ├── Navbar.tsx            # Sticky glass navbar with mobile menu
│   │   ├── Hero.tsx              # Hero section with glow background
│   │   ├── Features.tsx          # Bento grid feature showcase
│   │   ├── Pricing.tsx           # 3-tier pricing section
│   │   └── Footer.tsx            # Site footer
│   │
│   ├── dashboard/
│   │   ├── Sidebar.tsx           # Main app sidebar + user profile
│   │   ├── TopNav.tsx            # Dashboard top bar (search, notifications)
│   │   ├── ChatSidebar.tsx       # Chat history panel
│   │   └── ChatInterface.tsx     # Chat bubbles + prompt input
│   │
│   └── ui/
│       ├── Button.tsx            # Primary/ghost/outline button variants
│       ├── GlassCard.tsx         # Reusable glassmorphism card
│       └── SectionHeading.tsx    # Centered/left-aligned section titles
│
├── lib/
│   └── utils.ts                  # `cn()` helper for merging Tailwind classes
│
├── public/                       # Static assets (add your own images here)
├── tailwind.config.ts            # Color palette, shadows, animations
├── next.config.js
├── postcss.config.js
├── tsconfig.json
├── package.json
└── README.md
```

---

## 2. Requirements

- **Node.js** 18.18 or later (Node 20 LTS recommended)
- **npm**, **yarn**, or **pnpm**

---

## 3. Installation

1. Unzip the template folder.
2. Open a terminal in the project root and install dependencies:

   ```bash
   npm install
   ```

3. Start the local development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the landing
   page, and [http://localhost:3000/dashboard](http://localhost:3000/dashboard)
   for the AI chat interface.

5. When you're ready to deploy, build a production bundle:

   ```bash
   npm run build
   npm start
   ```

The template deploys out of the box to **Vercel**, **Netlify**, or any
Node-compatible host.

---

## 4. Customization Guide

### Brand colors

All colors live in **`tailwind.config.ts`** under `theme.extend.colors`.
Change `primary` and `secondary` to re-theme the entire product instantly —
every gradient, button, and glow references these tokens rather than
hardcoded hex values.

```ts
colors: {
  background: "#0a0a0b",
  primary: { DEFAULT: "#6366f1", ... },
  secondary: { DEFAULT: "#a855f7", ... },
}
```

### Fonts

The template loads **Inter** via `next/font/google` in `app/layout.tsx`. To
swap in a different typeface (e.g. Geist):

```tsx
import { Geist } from "next/font/google";
const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
```

Then apply the same `variable` name so Tailwind's `font-sans` picks it up
automatically — no other files need to change.

### Landing page copy

All headline, feature, and pricing copy is stored as plain text/arrays
directly inside each component (`Hero.tsx`, `Features.tsx`, `Pricing.tsx`).
Search for the text you want to change and edit it in place — no CMS or data
file required.

### Bento grid layout

`Features.tsx` uses a CSS grid (`grid-cols-3 grid-rows-2` on desktop) with
individual cards spanning different `col-span` / `row-span` values. Adjust
the `className` on each `motion.div` wrapper to resize or reorder cards.

### Connecting a real AI model

`components/dashboard/ChatInterface.tsx` currently simulates a response with
`setTimeout`. To connect a real model:

1. Create an API route, e.g. `app/api/chat/route.ts`, that calls your model
   provider (OpenAI, Anthropic, etc.) and streams or returns the reply.
2. In `ChatInterface.tsx`, replace the `setTimeout` block inside
   `handleSend` with a `fetch("/api/chat", { method: "POST", body: ... })`
   call, and set the assistant message from the response.
3. Keep your API keys server-side in `.env.local` — never expose them in
   client components.

### Adding new dashboard pages

The sidebar links in `components/dashboard/Sidebar.tsx` already point to
`/dashboard/workspace`, `/dashboard/automations`, and `/dashboard/settings`.
Create matching folders under `app/dashboard/` (each with a `page.tsx`) to
build those views — they'll automatically inherit the sidebar layout from
`app/dashboard/layout.tsx`.

### Dark mode

The template ships dark-mode-only by design (`className="dark"` on `<html>`
in `app/layout.tsx`). To support a light theme as well, remove that class,
enable Tailwind's `darkMode: "class"` toggle logic in your own theme switcher
component, and add light-mode color values alongside the existing dark
tokens in `tailwind.config.ts`.

---

## 5. Third-Party Assets & Licenses

- **Lucide Icons** — [ISC License](https://lucide.dev/license)
- **Framer Motion** — [MIT License](https://github.com/framer/motion)
- **Inter typeface** — [SIL Open Font License](https://fonts.google.com/specimen/Inter/about)

No paid or restrictively licensed assets are bundled with this template.

---

## 6. Support

If you run into an issue that isn't covered here, please reach out through
your Envato item page's comment section with:

- Your Node.js version (`node -v`)
- A description of the issue and any console error messages
- Steps to reproduce

We aim to respond to all support requests within 1–2 business days.

---

**Thank you for supporting this item — happy building! 🚀**
