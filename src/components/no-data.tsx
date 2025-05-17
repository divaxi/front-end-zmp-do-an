import React from "react";
import { cn } from "@/lib/utils";
import { Inbox } from "lucide-react";

interface NoDataProps {
  icon?: React.ReactNode;
  title?: string;
  message?: string;
  className?: string;
}

const defaultIcon = <Inbox className="h-16 w-16 text-muted-foreground/60" />;

function NoData({
  icon = defaultIcon,
  title = "Không có dữ liệu",
  message = "Hiện tại chưa có thông tin nào để hiển thị.",
  className,
}: NoDataProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center text-primary",
        className
      )}
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted/50">
        {icon}
      </div>
      <h2 className="mt-6 text-lg font-semibold text-primary">{title}</h2>
      <p className="mt-2 text-center text-sm leading-6 text-primary">
        {message}
      </p>
    </div>
  );
}

export { NoData };
