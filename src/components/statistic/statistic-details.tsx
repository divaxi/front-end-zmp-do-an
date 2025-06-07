import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, TrendingUp } from "lucide-react";

interface StatisticDetailsProps {
  data: { name: string; value: number }[];
  type: "day" | "month" | "year";
}

export function StatisticDetails({ data, type }: StatisticDetailsProps) {
  const getTitle = () => {
    switch (type) {
      case "day":
        return "Chi tiết theo ngày";
      case "month":
        return "Chi tiết theo tháng";
      case "year":
        return "Chi tiết theo năm";
      default:
        return "Chi tiết thống kê";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "day":
        return <CalendarDays className="w-5 h-5 text-primary" />;
      case "month":
        return <CalendarDays className="w-5 h-5 text-primary" />;
      case "year":
        return <CalendarDays className="w-5 h-5 text-primary" />;
      default:
        return <TrendingUp className="w-5 h-5 text-primary" />;
    }
  };

  return (
    <Card className="mt-6 border-0 shadow-none">
      <CardHeader className="px-0 pt-0">
        <div className="flex items-center gap-2">
          {getIcon()}
          <CardTitle className="text-lg font-semibold">{getTitle()}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="px-0">
        <div className="flex flex-col">
          <div className="flex justify-between items-center py-3 bg-muted/30 font-medium">
            <span className="w-1/2 text-center text-muted-foreground">
              Thời gian
            </span>
            <span className="w-1/2 text-center text-muted-foreground">
              Số lượng
            </span>
          </div>
          {data.map((item, index) => (
            <div key={item.name}>
              <div className="flex justify-between items-center py-3 hover:bg-muted/20 transition-colors group">
                <span className="w-1/2 text-center group-hover:text-primary transition-colors">
                  {item.name}
                </span>
                <span className="w-1/2 text-center font-medium group-hover:text-primary transition-colors">
                  {item.value.toLocaleString()}
                </span>
              </div>
              {index < data.length - 1 && (
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
