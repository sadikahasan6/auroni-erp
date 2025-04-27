import Benefits from "~/components/benefits";
import CoreFeatures from "~/components/corefeatures";
import CTASection from "~/components/cta";
import FAQ from "~/components/faq";
import Header from "~/components/header";
import HeroSection from "~/components/hero";

export default function Home() {
  return (
    <>
    <Header/>
    <HeroSection/>
      <CoreFeatures/>
      <Benefits/>
      <FAQ/>
      <CTASection/>
    </>
  );
}
