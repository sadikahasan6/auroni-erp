import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("pages/home.tsx"), route("login", "pages/login.tsx"), route ("register", "pages/register.tsx")] satisfies RouteConfig;
