import React, { useEffect, useState } from "react";
import AppointmentList from "@/components/appointment-list";
import { useAtom, useAtomValue } from "jotai";
import { appointmentList, authState, staffState } from "@/state";
import { PlusCircleIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppointment } from "@/client/services/appointment";

const AppointmentPage: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(6);
  const staff = useAtomValue(staffState);
  const auth = useAtomValue(authState);

  const { data } = useAppointment({
    page,
    limit,
    userId: auth?.auth?.user.id as number,
  });

  const [appointments, setAppointments] = useAtom(appointmentList);

  useEffect(() => {
    if (data) {
      setAppointments(data?.data);
    }
  }, [data, setAppointments]);

  const navigate = useNavigate();

  return (
    <div className="relative">
      <AppointmentList appointments={appointments} isStaff={!!staff} />

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
