import React from "react";
import ServiceSection from "./service-section";
import DoctorSection from "@/components/home/doctor-section";
import MenuSection from "@/components/home/menu-section";
import { useAtomValue } from "jotai";
import { authState } from "@/state";
import { RoleEnum } from "@/utils/enum";

const HomePage: React.FunctionComponent = () => {
  const auth = useAtomValue(authState);
  const isStaff = auth?.user.role.id === RoleEnum.staff;
  return (
    <div className="flex flex-col min-h-full bg-background pb-16 gap-3 ">
      {isStaff && <MenuSection />}
      <ServiceSection />
      <DoctorSection />
    </div>
  );
};

export default HomePage;
