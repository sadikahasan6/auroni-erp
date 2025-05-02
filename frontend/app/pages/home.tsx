import Benefits from "~/components/benefits";
import CoreFeatures from "~/components/corefeatures";
import CTASection from "~/components/cta";
import FAQ from "~/components/faq";
import Footer from "~/components/footer";
import Header from "~/components/header";
import HeroSection from "~/components/hero";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home || Auroni ERP" },
    {
      name: "description",
      content:
        "Auroni ERP unifies your business — automating tasks, streamlining operations, and delivering real-time insights. It breaks down silos, boosts efficiency, and empowers smart decisions. More than software, ERP is your strategic edge for growth, agility, and lasting success.",
    },
  ];
}

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <CoreFeatures />
      <Benefits />
      <FAQ />
      <CTASection />
      <Footer />

    </>
  );
}
