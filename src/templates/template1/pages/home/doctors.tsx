import { useHomeDoctors } from "@/client/services/doctor";
import Section from "@/components/section";

export default function DoctorList() {
  const { data: doctors } = useHomeDoctors();
  return (
    <Section title="Bác sĩ">
      <div className="pt-2.5 pb-4 flex space-x-4 overflow-x-auto px-4 scrollbar-hide">
        {doctors?.Value?.map((doctor) => (
          <div
            key={doctor.Id}
            className="flex-none rounded-lg shadow-sm border"
            style={{ width: "calc(40% - 8px)" }}
          >
            <div className="flex flex-col items-center p-3">
              <img
                src={doctor.ImageUrl}
                alt={doctor.Title}
                className="w-[60px] h-[60px] rounded-full mb-2 bg-skeleton"
              />
              <h3 className="text-sm font-medium text-center h-[40px] flex items-center">
                {doctor.Title}
              </h3>
              <p className="text-xs text-gray-500 text-center line-clamp-3 mt-1">
                {doctor.PreviewContent}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
