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
        <Testimonials />
      </Suspense>
    </div>
  );
};

export default Home;
