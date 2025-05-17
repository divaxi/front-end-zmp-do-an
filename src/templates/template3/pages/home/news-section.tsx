import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useNewsBanners } from "@/client/services/news";

export default function NewsSection() {
  const navigate = useNavigate();
  const { data } = useNewsBanners();
  return (
    <div className="px-4 pb-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-base font-bold">Tin tức</h2>
        <Button
          variant="ghost"
          className="text-primary text-xs px-1 py-0 h-auto"
          onClick={() => {
            navigate(`/news`);
          }}
        >
          Xem thêm
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        {data?.Value?.map((service) => (
          <div
            key={service.Id}
            className="flex flex-row gap-2 border border-[var(--normalBorder)] rounded-md shadow-sm h-full items-stretch"
          >
            <img
              src={service.Url}
              alt={service.Title}
              className="w-[150px] min-w-[150px] h-[100px] mih-h-[100px] object-cover object-center rounded-md bg-skeleton"
            />
            <div className="flex flex-col justify-between h-[100px] py-2">
              <p className="text-sm ">{service.Title}</p>
              {/* <p className="text-2xs text-[#8e949c] italic line-clamp-2"> */}
              {/* </p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
