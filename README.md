# Wired & Roasted ☕

## About The Project ℹ️

Wired & Roasted is a modern e-commerce platform for a coffee brand that emphasizes intensity and high-quality, uniquely roasted coffee beans. The project is designed with a dark, energetic theme to reflect the brand's edgy identity.

## Tech Stack 🛠️

*   **Framework:** [Next.js](https://nextjs.org/) (using the App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components:** [shadcn/ui](https://ui.shadcn.com/) (built on Radix UI)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **Form Management:** [React Hook Form](https://react-hook-form.com/)
*   **Schema Validation:** [Zod](https://zod.dev/)
*   **Theming:** [next-themes](https://github.com/pacocoursey/next-themes)

## Getting Started 🚀

To get a local copy up and running, follow these simple steps.

### Prerequisites 📋

*   Node.js (v18.x or later recommended)
*   npm (comes with Node.js)

### Installation ⚙️

1.  Clone the repo:
    ```sh
    git clone https://your-repository-url.git
    cd wired-and-roasted
    ```
2.  Install NPM packages:
    ```sh
    npm install
    ```

### Running for Development ▶️

To start the development server:

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production 📦

To create a production build:

```sh
npm run build
```

### Starting the Production Server 🌐

To start the application in production mode (after building):

```sh
npm run start
```

### Linting 🔍

To run the linter:

```sh
npm run lint
```

## Project Structure Highlights 🏗️

*   `app/`: Contains the core application routes, pages (e.g., `page.tsx`), and global layout (`layout.tsx`). Global styles are in `app/globals.css`.
*   `components/` (aliased, actual location `styles/components/`):
    *   `ui/`: Houses the shadcn/ui components.
    *   `theme-provider.tsx`: Manages light/dark mode.
*   `lib/`: Utility functions (e.g., `lib/utils.ts`).
*   `public/`: Static assets like images and fonts.
*   `styles/`:
    *   `hooks/`: Custom React hooks.
*   `tailwind.config.ts`: Configuration for Tailwind CSS.
*   `tsconfig.json`: TypeScript configuration, including path aliases.
*   `next.config.mjs`: Next.js configuration.

## Learn More 📚

To learn more about the technologies used, take a look at the following resources:

*   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
*   [Tailwind CSS Documentation](https://tailwindcss.com/docs) - learn about Tailwind CSS.
*   [shadcn/ui Documentation](https://ui.shadcn.com/docs) - learn about shadcn/ui components.
