// import { useHomeDoctors } from "@/client/services/doctor";
import Section from "../section";

export default function DoctorSection() {
  // const { data: doctors } = useHomeDoctors();
  const doctors = {
    Value: [
      {
        Id: 1,
        ImageUrl:
          "https://images.freeimages.com/images/premium/previews/5098/50982448-medical-doctor.jpg",
        Title: "Bác sĩ 1",
        PreviewContent: "Bác sĩ 10 năm kinh nghiệm",
      },
      {
        Id: 3,
        ImageUrl:
          "https://images.freeimages.com/images/premium/previews/5098/50982448-medical-doctor.jpg",
        Title: "Bác sĩ 2",
        PreviewContent: "Bác sĩ 10 năm kinh nghiệm",
      },
      {
        Id: 2,
        ImageUrl:
          "https://images.freeimages.com/images/premium/previews/5098/50982448-medical-doctor.jpg",
        Title: "Bác sĩ 3",
        PreviewContent: "Bác sĩ 10 năm kinh nghiệm",
      },
    ],
  };
  return (
    <Section title="Bác sĩ">
      <div className="pt-2.5 pb-4 flex space-x-4 overflow-x-auto px-4 scrollbar-hide">
        {doctors?.Value?.map((doctor) => (
          <div
            key={doctor.Id}
            className="flex-none rounded-lg shadow-sm border border-[var(--normalBorder)]"
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
