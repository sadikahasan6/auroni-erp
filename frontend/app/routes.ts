import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("pages/home.tsx"),
  route("features", "pages/features.tsx"),
  route("pricing","pages/pricing.tsx"),
  route("about", "pages/about.tsx"),
  route("contact", "pages/contact.tsx"),
  route("docs", "pages/docs.tsx"),
] satisfies RouteConfig;
