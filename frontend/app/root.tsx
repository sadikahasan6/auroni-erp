import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { ErrorUI } from "./pages/errors/error-ui";
import pagenotfound from "./pages/errors/404.svg";




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
  return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta/>
          <Links />
        </head>
        <body className="">
          {children}
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;
  let image = null;

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      message = "404";
      details = "The requested page could not be found.";
      image = <img src={pagenotfound} width={400} alt="404 Not Found" />;
    } else {
      message = "Error";
      details = error.statusText || details;
    }
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <div>
      <ErrorUI
        message={message}
        details={details}
        stack={stack}
        image={image}
      />
    </div>
  );
}
