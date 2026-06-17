import {
  isRouteErrorResponse,
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import LoadingScreen from "./components/loading-screen";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    `flex flex-col items-center gap-0.5 transition-colors ${isActive ? 'text-emerald-600 font-bold' : 'text-slate-400 font-medium'
    }`;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 font-sans">{/* Header Banner in Argentina Albiceleste Colors */}
          <header className="relative bg-gradient-to-b from-[#74ACDF] via-[#74ACDF] to-white px-6 pt-6 pb-8 text-center shadow-sm border-b-4 border-[#F6B426]">

            {/* Absolute centered Sun emblem decoration pattern behind text */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none overflow-hidden">
              <span className="text-8xl">☀️</span>
            </div>

            <div className="relative z-10">
              <h1 className="text-2xl font-black tracking-tight uppercase text-slate-900 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                Charity 2026
              </h1>

              <p className="inline-block bg-[#F6B426] text-slate-900 text-[10px] font-black uppercase tracking-widest mt-2 px-3 py-1 rounded-full shadow-sm border border-white">
                Playing for Generando Puentes
              </p>
            </div>
          </header>

          <main className="max-w-md mx-auto p-4">
            <Outlet />
          </main>

          {/* Persistent Bottom Mobile Navigation Bar */}
          <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 h-16 flex items-center justify-around px-2 shadow-lg max-w-md mx-auto z-50">
            <NavLink to="/" className={navItemClass}>
              <span className="text-lg">🏠</span>
              <span className="text-[10px] tracking-tight">Home</span>
            </NavLink>

            <NavLink to="/fixture/men/group-a" className={navItemClass}>
              <span className="text-lg">⚽</span>
              <span className="text-[10px] tracking-tight">Fixtures</span>
            </NavLink>

            <NavLink to="/timeline" className={navItemClass}>
              <span className="text-lg">🗓️</span>
              <span className="text-[10px] tracking-tight">Timeline</span>
            </NavLink>

            <NavLink to="/canteen" className={navItemClass}>
              <span className="text-lg">🍔</span>
              <span className="text-[10px] tracking-tight">Canteen</span>
            </NavLink>

            <NavLink to="/cause" className={navItemClass}>
              <span className="text-lg">❤️</span>
              <span className="text-[10px] tracking-tight">Cause</span>
            </NavLink>
          </nav>
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function HydrateFallback() {
  return <LoadingScreen message="Loading..." />;
}

export default function App() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <>
      {isLoading && <LoadingScreen />}
      <Outlet />
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
