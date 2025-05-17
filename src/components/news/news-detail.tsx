import { useAtomValue } from "jotai";
import { newsDetailState } from "@/state";

export default function NewsDetail() {
  const { data: newsDetail, isLoading } = useAtomValue(newsDetailState)();

  return (
    <>
      <div className="flex flex-col">
        <div className="w-full">
          {!isLoading && newsDetail && (
            <div className="w-full flex flex-col">
              <img
                src={newsDetail.videoThumbnail}
                alt={newsDetail.title}
                className="w-full h-[180px] object-cover"
              />
              <div className="p-4 flex flex-col gap-4">
                <div className="flex flex-col gap-2 border-l-4 border-primary pl-3">
                  <h2 className="text-primary font-semibold">
                    {newsDetail.title}
                  </h2>
                  <div className="text-xs text-subtitle">
                    {newsDetail.createdAt} • {newsDetail.viewCount} lượt xem
                  </div>
                </div>
                <h1 className="text-sm font-semibold text-muted-foreground">
                  {newsDetail.content[0].text}{" "}
                </h1>
                <span>{newsDetail.content[1].text}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
