# AGENTS.md - Developer Guidelines for al-ikhlas

## Project Overview

Al-Ikhlas is a Next.js 16 application for a mosque website, featuring prayer times, events, and community information. It uses React 19, TypeScript, Tailwind CSS v4, and follows shadcn/ui patterns with Base UI components.

## Commands

### Development
```bash
bun dev         # Start development server (uses bun)
bun run build       # Build for production
bun start       # Start production server
bun run lint        # Run ESLint
```

### Testing
- **No test framework is currently configured.** If adding tests, prefer Vitest for unit tests and React Testing Library for component tests. Run a single test file with:
  ```bash
  vitest run path/to/test.spec.ts
  # or
  vitest path/to/test.spec.ts
  ```

## Code Style Guidelines

### General Principles
- Keep code concise and readable
- Prefer explicit over implicit
- Follow existing patterns in the codebase

### TypeScript
- Use explicit type annotations for function parameters and return types when not inferrable
- Use `type` for object shapes and interfaces for extensible types
- Avoid `any`; use `unknown` when type is truly unknown

### Imports
- Use path aliases (`@/` for root)
- Order: external libs → internal components/utils → relative paths
- Group imports with blank lines between groups
```typescript
import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SomeComponent } from "./some-component";
```

### Naming Conventions
- **Components**: PascalCase (e.g., `HeroSection`, `PrayerTimes`)
- **Functions/variables**: camelCase (e.g., `getActivePrayer`, `activePrayer`)
- **Interfaces/types**: PascalCase with descriptive names (e.g., `Prayer`, `PrayerTimesProps`)
- **Files**: kebab-case for components (e.g., `hero-section.tsx`), PascalCase for utilities (e.g., `utils.ts`)

### React Patterns
- Use `"use client"` directive for client components at the top of the file
- Prefer function components with hooks over class components
- Use early returns for cleaner conditionals
- Destructure props in function signature when possible
```typescript
export function Hero({ title, subtitle }: HeroProps) {
  if (!title) return null;
  // ...
}
```

### CSS & Styling
- Use Tailwind CSS utility classes
- Custom colors are defined in `app/globals.css` under `@theme`
- Available theme colors: `cream`, `warm`, `parchment`, `sand`, `clay`, `forest`, `forest-mid`, `gold`, `gold-light`, `charcoal`, `brown`
- Use `cn()` utility for conditional class merging
- Prefer Tailwind arbitrary values (`text-[0.68rem]`) over custom CSS when appropriate

### Error Handling
- Use try/catch for async operations
- Return early on error conditions
- Log errors appropriately (no sensitive data)

### Component Structure
```typescript
"use client";

import { useState, useEffect } from "react";
import { SomeLib } from "some-lib";
import { cn } from "@/lib/utils";
import { SomeComponent } from "@/components/ui/some-component";

interface ComponentProps {
  // props interface
}

export function Component({ prop1, prop2 }: ComponentProps) {
  // hooks
  // early returns
  // render
}
```

### File Organization
- Page components: `app/page.tsx`, `app/[slug]/page.tsx`
- Section components: `app/ui/section/*.tsx`
- UI components: `components/ui/*.tsx`
- Utilities: `lib/utils.ts`
- Types: co-locate with usage or in `lib/types.ts`

### Git Conventions
- Use meaningful commit messages
- Keep commits atomic and focused
- Run `bun run lint` before committing

### Accessibility
- Use semantic HTML elements
- Include alt text for images
- Ensure keyboard navigation works
- Use ARIA attributes when needed

### Performance
- Use Next.js `<Image />` component for images
- Lazy load heavy components with `dynamic` imports
- Memoize expensive computations with `useMemo`/`useCallback` when needed
- Use `priority` prop for above-the-fold images
