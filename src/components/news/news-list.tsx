import { useAtomValue } from "jotai";
import { servicesState } from "@/state";
import { FC } from "react";

interface Props {
  tabIndex: string;
}

const NewsList: FC<Props> = ({ tabIndex }) => {
  const news = useAtomValue(servicesState);

  return (
    <div className="flex flex-col gap-2" key={tabIndex}>
      {news.map((service) => (
        <div
          key={service.id}
          className="flex flex-row gap-2 border border-[var(--normalBorder)] rounded-md shadow-sm h-full items-stretch"
        >
          <img
            src={service.image}
            alt={service.label}
            className="w-[130px] h-[130px] object-cover rounded-md bg-skeleton"
          />
          <div className="flex flex-col justify-between h-[130px] py-2">
            <p className="text-base line-clamp-2">{service.label}</p>
            <p className="text-xs text-subtitle italic line-clamp-2">
              {service?.date || `22/4/2025`}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsList;
