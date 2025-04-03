import type { Route } from "./+types/home";
import LoginPage from "./login";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Auroni ERP" },
    { name: "description", content: "Free and opensource modern ERP" },
  ];
}

export default function Home() {
  return (
    <div className="">
      <LoginPage/>
    </div>
  );
}
