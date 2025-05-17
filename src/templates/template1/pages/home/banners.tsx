import Carousel from "@/components/carousel";
import { useNewsBanners } from "@/client/services/news";

export default function Banners() {
  const { data: banners } = useNewsBanners();

  const slides =
    banners?.Value?.map((banner) => (
      <div key={banner.Id} className="relative w-full ">
        <img
          src={banner.Url}
          alt={banner.Title}
          className="w-full h-full object-cover object-center rounded-md bg-skeleton max-h-[200px] min-h-[200px]"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent rounded-b-md p-4">
          <h2 className="text-white text-base font-semibold">{banner.Title}</h2>
        </div>
      </div>
    )) ?? [];

  return <Carousel slides={slides} />;
}
