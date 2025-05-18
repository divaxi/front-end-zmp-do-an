import React, { useEffect } from "react";
import AppointmentList from "@/components/appointment-list";
import { useAtom, useAtomValue } from "jotai";
import { appointmentList, appointmentsState, authState } from "@/state";
import { PlusCircleIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AppointmentPage: React.FC = () => {
  const [appointments, setAppointment] = useAtom(appointmentList);
  const fetchedData = useAtomValue(appointmentsState);
  const { isStaff } = useAtomValue(authState);
  const navigate = useNavigate();
  useEffect(() => {
    if (
      appointments.length === 0 &&
      fetchedData.length !== appointments.length
    ) {
      setAppointment(fetchedData);
    }
  }, [appointments, fetchedData, setAppointment]);

  return (
    <div className="relative">
      <AppointmentList
        appointments={appointments}
        isLoading={appointments.length === 0}
        isStaff={isStaff}
      />
      <div className="fixed bottom-24 right-3 flex flex-col items-center gap-2 z-50">
        <h1 className="text-primary font-semibold text-sm">Đặt lịch ngay</h1>
        <PlusCircleIcon
          className="w-12 h-12 bg-primary rounded-full text-white shadow-lg cursor-pointer"
          onClick={() => navigate("/booking")}
        />
      </div>
    </div>
  );
};

export default AppointmentPage;
