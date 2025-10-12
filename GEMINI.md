# Project Overview

This is a Next.js application designed as a "gym-app" or "powerbuilding program," as suggested by its metadata and content. It provides structured training programs (gym and home-based), nutrition guidance, and progress tracking features.

**Key Technologies:**
*   **Framework:** Next.js (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS, PostCSS, `tw-animate-css`
*   **UI Components:** Radix UI
*   **Authentication:** Custom session management using `jose` and Next.js cookies.
*   **Database:** `drizzle-orm` with support for various database clients (e.g., PostgreSQL, SQLite).

# Building and Running

Use the following commands to manage the project:

*   **Install Dependencies:**
    ```bash
    npm install
    # or yarn install
    # or pnpm install
    ```
*   **Start Development Server:**
    ```bash
    npm run dev
    ```
    (Runs the application in development mode, usually on `http://localhost:3000`)
*   **Build for Production:**
    ```bash
    npm run build
    ```
    (Compiles the application for deployment)
*   **Start Production Server:**
    ```bash
    npm run start
    ```
    (Starts the Next.js production server)
*   **Lint the Codebase:**
    ```bash
    npm run lint
    ```

# Development Conventions

*   **Project Structure:** Follows a standard Next.js App Router structure with `app/` for pages and API routes, `components/` for UI components, `lib/` for utility functions and backend logic, and `public/` for static assets.
*   **Styling:** Utilizes Tailwind CSS for utility-first styling, configured via `postcss.config.mjs` and `app/globals.css`. Custom CSS variables are defined in `app/globals.css`.
*   **Component Library:** Relies heavily on Radix UI for accessible and customizable UI components.
*   **Path Aliases:** The `@/*` alias is configured in `tsconfig.json` to resolve paths relative to the project root, e.g., `@/components` instead of `../../components`.
*   **Authentication:** Authentication logic is handled in `lib/auth.ts`, using `jose` for JWT management and Next.js server components for cookie handling.
*   **Database Interactions:** `drizzle-orm` is used for database interactions, with schema definitions likely found in `lib/db/schema.ts` and queries in `lib/db/queries.ts`.
