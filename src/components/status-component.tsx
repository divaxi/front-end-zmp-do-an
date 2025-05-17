import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import clsx from "clsx";
import { FC } from "react";
import {
  APPOINTMENT_STATUS_TEXT,
  APPOINTMENT_STATUS_COLOR,
} from "@/constants/appointment";

type Status = keyof typeof APPOINTMENT_STATUS_TEXT;

type Props = {
  status: Status;
  isStaff?: boolean;
  id?: string;
  onChange?: (newStatus: Status, id?: string) => void;
};

const StatusComponent: FC<Props> = ({
  status,
  id,
  isStaff = false,
  onChange,
}) => {
  const statusText = APPOINTMENT_STATUS_TEXT[status];
  const statusColor = APPOINTMENT_STATUS_COLOR[status];

  const sharedClass =
    "min-w-[130px] h-8 px-2 py-1 rounded-lg text-xs text-white inline-flex items-center justify-center border-none";

  if (isStaff) {
    return (
      <Select
        value={status}
        onValueChange={(val) => onChange?.(val as Status, id)}
      >
        <SelectTrigger
          className={sharedClass}
          style={{ backgroundColor: statusColor }}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="border-primary">
          {Object.entries(APPOINTMENT_STATUS_TEXT).map(([key, label]) => (
            <SelectItem
              key={key}
              value={key}
              className="text-xs text-white hover:opacity-90 cursor-pointer mb-2"
              style={{
                backgroundColor: APPOINTMENT_STATUS_COLOR[key as Status],
              }}
            >
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  return (
    <span
      className={clsx(sharedClass)}
      style={{ backgroundColor: statusColor }}
    >
      {statusText}
    </span>
  );
};

export default StatusComponent;
