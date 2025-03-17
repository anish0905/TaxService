import React, { Suspense } from "react";
import Testimonials from "../components/Testimonials";
import AlternatingSections from "../components/AlternatingSections";
import CollaborationPage from "../components/colobration/CollaborationPage";
import Industries from "../components/Industries";
import { Services}  from "../components/Services/Services";

// Lazy load components
const HeroSection = React.lazy(() => import("../components/Home/HeroSection"));
const TrustedByCustomers = React.lazy(() =>
  import("../components/Home/TrustedByCustomers")
);
const WorkingOverview = React.lazy(() => import("./WorkingOverview"));
const CaseStudies = React.lazy(() => import("../components/Home/CaseStudies"));
const Service = React.lazy(() => import("../components/Service"));
const Expert = React.lazy(() => import("../components/QsnToAsk/Expert"));
// const Test = React.lazy(() => import("./Test"));
// If you want to use Testimonials later
// const Testimonials = React.lazy(() => import("../components/Testimonials"));

// import FlipCards from "../components/Home/FlipCards";

const Home = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <HeroSection />
        <Services/>

        <WorkingOverview />
        <TrustedByCustomers />
        <CollaborationPage />
        <AlternatingSections />
        <CaseStudies />
        <Industries />
        <Service />
        <Expert />
        {/* <Test /> */}
        {/* Uncomment this when you're ready to use Testimonials */}
        <Testimonials />
      </Suspense>
    </div>
  );
};

export default Home;
