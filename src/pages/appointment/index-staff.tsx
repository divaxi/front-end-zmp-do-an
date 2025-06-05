import React, { useEffect } from "react";
import AppointmentList from "@/components/appointment-list";
import { useAtom, useAtomValue } from "jotai";
import { appointmentList, authState, staffState } from "@/state";
import { useAppointmentService } from "@/client/services/appointment-service";

const AppointmentStaffPage: React.FC = () => {
  const staff = useAtomValue(authState)?.staff;

  const { data } = useAppointmentService({
    staffId: staff?.id,
  });

  const [appointments, setAppointments] = useAtom(appointmentList);

  useEffect(() => {
    if (data) {
      setAppointments(data.map((ap) => ap.appointment));
    }
  }, [data, setAppointments]);

  return (
    <div className="relative">
      <AppointmentList appointments={appointments} isStaff={true} />
    </div>
  );
};

export default AppointmentStaffPage;
