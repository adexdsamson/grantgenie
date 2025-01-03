import { Clients } from "./layouts/Clients";
import { CallToAction } from "./layouts/Cta";
import { Features, FeatureTwo } from "./layouts/Features";
import { Footer } from "./layouts/Footer";
import { Header } from "./layouts/Header";
import { Heropage } from "./layouts/Hero";

export const LandingPage = () => {
  return (
    <div className="bg-[#f8f9ff] text-black text-[15px]">
      <Header />
      <Heropage />
      <Features />
      <FeatureTwo />
      <Clients />
      <CallToAction />
      <Footer />
    </div>
  );
};
