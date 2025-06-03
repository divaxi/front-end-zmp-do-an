import { Button } from "@/components/ui/button";
import { CalendarSyncIcon, ChartLineIcon } from "lucide-react";

import React, { FC } from "react";

import { useNavigate } from "react-router-dom";

interface CategoryItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  path: string;
}

interface props {
  extras?: CategoryItem[];
}

const MenuSection: FC<props> = ({ extras = [] }) => {
  const navigate = useNavigate();

  const defaulCategories: CategoryItem[] = [
    {
      id: "booking",
      name: "Lịch hẹn",
      icon: (
        <svg
          width="15"
          height="20"
          viewBox="0 0 15 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="scale-125"
        >
          <path
            d="M1.80775 20C1.30258 20 0.875 19.8158 0.525 19.4474C0.175 19.0789 0 18.6289 0 18.0971V1.90289C0 1.37114 0.175 0.921053 0.525 0.552632C0.875 0.184211 1.30258 0 1.80775 0H9.75L15 5.52632V18.0971C15 18.6289 14.825 19.0789 14.475 19.4474C14.125 19.8158 13.6974 20 13.1923 20H1.80775ZM9 6.31579V1.57895H1.80775C1.73075 1.57895 1.66025 1.61272 1.59625 1.68026C1.53208 1.74763 1.5 1.82184 1.5 1.90289V18.0971C1.5 18.1782 1.53208 18.2524 1.59625 18.3197C1.66025 18.3873 1.73075 18.4211 1.80775 18.4211H13.1923C13.2692 18.4211 13.3398 18.3873 13.4038 18.3197C13.4679 18.2524 13.5 18.1782 13.5 18.0971V6.31579H9Z"
            fill="currentColor"
            className="text-iconStroke"
          />
        </svg>
      ),
      path: "/appointment",
    },

    {
      id: "schedule",
      name: "Lịch làm việc",
      icon: <CalendarSyncIcon className="text-iconStroke scale-125" />,
      path: "/schedule",
    },
    {
      id: "satistic",
      name: "Thống kê",
      icon: <ChartLineIcon className="text-iconStroke scale-125" />,
      path: "/treatment",
    },
  ];
  const categories = [...defaulCategories, ...extras];

  return (
    <div className="bg-gradient-to-b from-[var(--backgroundHero)_60%] to-[var(--background)_40%] py-1 ">
      <div className="grid grid-cols-3 gap-4 mx-4 my-6 py-4 rounded-lg bg-background shadow-md">
        {categories.map((category) => (
          <div key={category.id} className="flex flex-col items-center">
            <Button
              variant="outline"
              size="icon"
              className="w-[50px] h-[50px] rounded-full border border-iconBorder bg-iconBackground mb-1 hover:bg-gray-100"
              onClick={() => navigate(category.path)}
            >
              {category.icon}
            </Button>
            <span className="text-center text-sm font-medium">
              {category.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MenuSection;
