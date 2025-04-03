import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Auroni ERP" },
    { name: "description", content: "Free and opensource modern ERP" },
  ];
}

export default function Home() {
  return (
    <div className="">
      Home page for trial
    </div>
  );
}
