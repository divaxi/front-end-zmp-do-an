import { useHomeDoctors } from "@/client/services/doctor";
import Section from "../section";

export default function DoctorSection() {
  const { data: doctors } = useHomeDoctors({ limit: 999, page: 1 });
  return (
    <Section title="Bác sĩ">
      <div className="pt-2.5 pb-4 flex space-x-4 overflow-x-auto px-4 scrollbar-hide">
        {doctors?.data?.map((doctor) => (
          <div
            key={doctor.id}
            className="flex-none rounded-lg shadow-sm border border-[var(--normalBorder)]"
            style={{ width: "calc(40% - 8px)" }}
          >
            <div className="flex flex-col items-center p-3">
              <img
                src={
                  doctor.user.avatar?.path ||
                  "https://images.freeimages.com/images/premium/previews/5098/50982448-medical-doctor.jpg"
                }
                alt={doctor.user.userName}
                className="w-[60px] h-[60px] rounded-full mb-2 bg-skeleton"
              />
              <h3 className="text-sm font-medium text-center h-[40px] flex items-center">
                {doctor.user.userName}
              </h3>
              <p className="text-xs text-gray-500 text-center line-clamp-3 mt-1">
                {doctor.specialization}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
