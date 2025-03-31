import { Outlet } from "react-router";
import type { Route } from "../+types/root";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Authentication || Auroni ERP" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function AuthLayout() {
  return (
    <>
    Working on it.
      <Outlet />
    </>
  );
}
