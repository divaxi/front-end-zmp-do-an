import React from "react";
import ServiceSection from "./service-section";
import DoctorSection from "@/components/home/doctor-section";
import MenuSection from "@/components/home/menu-section";

const HomePage: React.FunctionComponent = () => {
  return (
    <div className="flex flex-col min-h-full bg-background pb-16 gap-3">
      <MenuSection />
      <ServiceSection />
      <DoctorSection />
    </div>
  );
};

export default HomePage;
