import Hero from "../components/Hero";
// import TrustedCompanies from "../components/TrustedCompanies";
import Services from "../components/Services";
import TechPlatform from "../components/TechPlatform";
import WhyChoose from "../components/WhyChoose";
import Industries from "../components/Industries";
import Process from "../components/Process";
import BusinessOutcomes from "../components/BusinessOutcomes";
import Stats from "../components/Stats";
// import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";

function Home() {
  return (
    <>
      <Hero />

      {/* Trusted Partners section — temporarily disabled until real
          partner logos are available. Component is kept intact. */}
      {/* <TrustedCompanies /> */}

      <Services />
      <TechPlatform />
      <WhyChoose />
      <Industries />
      <Process />
      <BusinessOutcomes />
      <Stats />

      {/* Testimonials section — temporarily disabled until real client
          testimonials/photos are available. Component is kept intact. */}
      {/* <Testimonials /> */}

      <CTA />
    </>
  );
}

export default Home;
