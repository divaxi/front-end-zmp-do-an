import React from "react";
import AppointmentList from "@/components/appointment-list";
import { useAtomValue } from "jotai";
import { appointmentsState } from "@/state";

const AppointmentPage: React.FC = () => {
  const appointments = useAtomValue(appointmentsState);
  return <AppointmentList appointments={appointments} isLoading={false} />;
};

export default AppointmentPage;
