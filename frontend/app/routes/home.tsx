import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import HomePage from "./home/homePage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home page || Auroni ERP" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <HomePage/>;
}
