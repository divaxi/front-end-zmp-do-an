import React from "react";
import ZaloSection from "@/components/home/zalo-section";
import DoctorSection from "@/components/home/doctor-section";
import NewsSection from "./news-section";
import MenuSection from "@/components/home/menu-section";

const HomePage: React.FunctionComponent = () => {
  const extraMenu = {
    id: "service",
    name: "Dịch vụ",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="20"
        viewBox="0 0 18 20"
        fill="none"
        className="text-iconStroke scale-125"
      >
        <path
          d="M8.20588 18.0081V10.4557L1.58824 6.62664V13.996C1.58824 14.0501 1.60182 14.101 1.629 14.1486C1.65618 14.196 1.69685 14.2367 1.75103 14.2705L8.20588 18.0081ZM9.79412 18.0081L16.249 14.2705C16.3031 14.2367 16.3438 14.196 16.371 14.1486C16.3982 14.101 16.4118 14.0501 16.4118 13.996V6.62664L9.79412 10.4557V18.0081ZM8.04309 19.7395L0.957177 15.6641C0.655765 15.4906 0.420882 15.2588 0.252529 14.9685C0.0841763 14.6781 0 14.3593 0 14.0121V5.98789C0 5.64069 0.0841763 5.32189 0.252529 5.03148C0.420882 4.74124 0.655765 4.50936 0.957177 4.33585L8.04309 0.260528C8.34432 0.0868432 8.66329 0 9 0C9.33671 0 9.65568 0.0868432 9.95691 0.260528L17.0428 4.33585C17.3442 4.50936 17.5791 4.74124 17.7475 5.03148C17.9158 5.32189 18 5.64069 18 5.98789V14.0121C18 14.3593 17.9158 14.6781 17.7475 14.9685C17.5791 15.2588 17.3442 15.4906 17.0428 15.6641L9.95691 19.7395C9.65568 19.9132 9.33671 20 9 20C8.66329 20 8.34432 19.9132 8.04309 19.7395ZM13.0826 6.72027L15.5382 5.31237L9.1628 1.6277C9.10862 1.59384 9.05435 1.57691 9 1.57691C8.94565 1.57691 8.89138 1.59384 8.83721 1.6277L6.53824 2.95017L13.0826 6.72027ZM9 9.08855L11.4618 7.66425L4.92353 3.88807L2.46176 5.31237L9 9.08855Z"
          fill="currentColor"
          className="text-iconStroke"
        />
      </svg>
    ),
    path: "/services",
  };
  return (
    <div className="flex flex-col min-h-full bg-background pb-16 gap-3">
      <MenuSection extras={[extraMenu]} />
      <ZaloSection />
      <NewsSection />
      <DoctorSection />
    </div>
  );
};

export default HomePage;
