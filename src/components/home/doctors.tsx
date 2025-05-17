import Section from "@/components/section";
import React from "react";

interface Doctor {
  id: string;
  name: string;
  title: string;
  description: string;
  image: string;
}

const doctors: Doctor[] = [
  {
    id: "1",
    name: "Nguyễn Việt Anh",
    title: "BS nội trú Đại học Y Hà Nội chuyên chỉnh nha",
    description: "",
    image: "/path/to/image1.jpg",
  },
  {
    id: "2",
    name: "Ths.Bs Lê Thế Dương",
    title: "BS tổng quát: hàn răng...",
    description: "",
    image: "/path/to/image2.jpg",
  },
  {
    id: "3",
    name: "Ths.Bs Lê Thế Dương",
    title:
      "BS tổng quát: hàn răng, chữa tủy, phục hình, khám răngủy, phục hình, khám răngủy, phục hình, khám răngủy, phục hình, khám răng...",
    description: "",
    image: "/path/to/image2.jpg",
  },
  {
    id: "4",
    name: "Ths.Bs Lê Thế Dương",
    title: "BS tổng quát: hàn răng, chữa tủy, phục hình, khám răng...",
    description: "",
    image: "/path/to/image2.jpg",
  },
];

export default function DoctorList() {
  return (
    <Section title="Bác sĩ">
      <div className="pt-2.5 pb-4 flex space-x-4 overflow-x-auto px-4 scrollbar-hide">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="flex-none rounded-lg shadow-sm border"
            style={{ width: "calc(40% - 8px)" }}
          >
            <div className="flex flex-col items-center p-3">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-[60px] h-[60px] rounded-full mb-2"
              />
              <h3 className="text-sm font-medium text-center h-[40px] flex items-center">
                {doctor.name}
              </h3>
              <p className="text-xs text-gray-500 text-center line-clamp-3 mt-1">
                {doctor.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
