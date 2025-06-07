import React, { useEffect } from "react";
import AppointmentList from "@/components/appointment-list";
import { useAtom, useAtomValue } from "jotai";
import { appointmentList, authState, staffState } from "@/state";
import { useAppointmentByStaff } from "@/client/services/appointment";

const AppointmentStaffPage: React.FC = () => {
  const staff = useAtomValue(authState)?.staff;

  const { data } = useAppointmentByStaff({
    staffId: staff?.id ?? "",
  });

  const [appointments, setAppointments] = useAtom(appointmentList);

  useEffect(() => {
    if (data) {
      setAppointments(data.data);
    }
  }, [data, setAppointments]);

  return (
    <div className="relative">
      <AppointmentList appointments={appointments} isStaff={true} />
    </div>
  );
};

export default AppointmentStaffPage;
