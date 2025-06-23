import { useHomeDoctors } from "@/client/services/doctor";
import Section from "../section";
import { Skeleton } from "../ui/skeleton";

export default function DoctorSection() {
  const { data: doctors, isLoading } = useHomeDoctors({ limit: 999, page: 1 });
  return (
    <Section title="Bác sĩ">
      {isLoading && (
        <div className="pt-2.5 pb-4 flex space-x-4 overflow-x-auto px-4 scrollbar-hide">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col min-w-[150px] border border-[var(--normalBorder)] rounded-md shadow-sm p-2"
            >
              <div className="w-full h-[100px] object-cover rounded-md bg-skeleton" />
              <p className="text-sm text-subtitle mt-2 line-clamp-2">
                <Skeleton className="w-full h-[20px] rounded-md" />
              </p>
            </div>
          ))}
        </div>
      )}
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
