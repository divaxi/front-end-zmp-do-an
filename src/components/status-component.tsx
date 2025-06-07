import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import clsx from "clsx";
import {
  APPOINTMENT_STATUS_TEXT,
  APPOINTMENT_STATUS_COLOR,
  APPOINTMENT_STATUS,
} from "@/constants/appointment";
import { Control, Controller, FieldValues } from "react-hook-form";

type Status = keyof typeof APPOINTMENT_STATUS_TEXT;

type Props<T extends FieldValues = FieldValues> = {
  control: Control<T>;
  name: string;
  isStaff?: boolean;
  id?: string;
  status?: Status;
  onChange?: (newStatus: Status, id?: string) => void;
};

const StatusComponent = <T extends FieldValues = FieldValues>({
  control,
  name,
  id,
  isStaff = false,
  status,
  onChange,
}: Props<T>) => {
  const sharedClass =
    "min-w-[130px] h-8 px-2 py-1 rounded-lg text-xs text-white inline-flex items-center justify-center border-none";

  return isStaff && status !== APPOINTMENT_STATUS.scheduled ? (
    <Controller
      control={control}
      name={name as never}
      defaultValue={status as never}
      render={({ field }) => (
        <Select
          value={APPOINTMENT_STATUS_TEXT[field.value as unknown as Status]}
          onValueChange={(val) => {
            const key = Object.keys(APPOINTMENT_STATUS_TEXT).find(
              (key) => APPOINTMENT_STATUS_TEXT[key] === val
            );
            onChange?.(Number(key));
          }}
        >
          <SelectTrigger
            className={sharedClass}
            style={{ backgroundColor: APPOINTMENT_STATUS_COLOR[field.value] }}
          >
            <SelectValue placeholder="Chọn trạng thái" />
          </SelectTrigger>
          <SelectContent className="border-primary">
            {Object.entries(APPOINTMENT_STATUS_TEXT).map(([key, label]) => (
              <SelectItem
                key={key}
                value={APPOINTMENT_STATUS_TEXT[key as unknown as Status]}
                className="text-xs text-white hover:opacity-90 cursor-pointer mb-2"
                style={{
                  backgroundColor:
                    APPOINTMENT_STATUS_COLOR[key as unknown as Status],
                }}
              >
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  ) : (
    <div className="flex flex-col items-center">
      <span
        className={clsx(sharedClass)}
        style={{
          backgroundColor: APPOINTMENT_STATUS_COLOR[status as Status] || "#ccc",
        }}
      >
        {APPOINTMENT_STATUS_TEXT[status as Status]}
      </span>
    </div>
  );
};

export default StatusComponent;
