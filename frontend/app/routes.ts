import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  index("pages/home.tsx"),
  route("/about", "pages/about.tsx"),
  route("/contact", "pages/contact.tsx"),
  layout("./layouts/AuthLayout.tsx", [
    route("/login", "pages/auth/Login.tsx"),
  ])
] satisfies RouteConfig;
