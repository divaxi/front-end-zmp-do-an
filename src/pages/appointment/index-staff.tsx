import React, { useEffect, useState } from "react";
import AppointmentList from "@/components/appointment-list";
import { useAtom, useAtomValue } from "jotai";
import { appointmentList, authState, staffState } from "@/state";
import { useAppointmentByStaff } from "@/client/services/appointment";
import PaginationComponent from "@/components/pagination";

const AppointmentStaffPage: React.FC = () => {
  const staff = useAtomValue(authState)?.staff;
  
  const [page,setPage]=useState<number>(1)

  const { data } = useAppointmentByStaff({
    page,
    limit:6,
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
      <PaginationComponent page={page} onPageChange={setPage} hasNextPage={data?.hasNextPage||false}/>
    </div>
  );
};

export default AppointmentStaffPage;
