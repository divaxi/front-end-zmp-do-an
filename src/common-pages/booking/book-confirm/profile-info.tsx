import { Calendar, User, Phone, FileText } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FC, useEffect, useState } from "react";
import { useCustomerRecord } from "@/client/services/customer-record";
import { useAtomValue } from "jotai";
import { authState } from "@/state";
import { CustomerRecord } from "@/client/api";
import { format, parseISO } from "date-fns";

interface Props {
  onReadyChange?: (ready: boolean) => void;
  selectedProfile: CustomerRecord | null;
  onProfileChange: (profile: CustomerRecord | null) => void;
}

const ProfileInfo: FC<Props> = ({
  onReadyChange,
  selectedProfile,
  onProfileChange,
}) => {
  const auth = useAtomValue(authState)?.auth;
  const { data } = useCustomerRecord({ userId: auth?.user.id || 0 });

  const handleSelectProfile = (profile: CustomerRecord) => {
    onProfileChange(profile);
  };

  useEffect(() => {
    onReadyChange?.(true);
  }, [onReadyChange]);

  if (!data) return null;
  return (
    <>
      <h2 className="font-medium text-lg text-center pt-3">Thông tin hồ sơ</h2>
      <div className="space-y-4 m-4">
        <div className="space-y-2">
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Chọn hồ sơ
            </label>
            <Select
              onValueChange={(value) => {
                const profile = data?.find((p) => p.id === value);
                if (profile) handleSelectProfile(profile);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn hồ sơ của bạn" />
              </SelectTrigger>
              <SelectContent>
                {data?.map((profile) => (
                  <SelectItem key={profile.id} value={profile.id}>
                    {profile.fullName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <label className="text-sm font-medium flex items-center">
            <User className="h-4 w-4 mr-2" />
            Họ và tên
          </label>
          <Input
            disabled
            placeholder="Nhập họ và tên của bạn"
            defaultValue={selectedProfile?.fullName}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center">
            <Phone className="h-4 w-4 mr-2" />
            Số điện thoại
          </label>
          <Input
            disabled
            placeholder="Nhập số điện thoại"
            type="tel"
            defaultValue={selectedProfile?.user.phoneNumber}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Ngày sinh
          </label>
          <Input
            disabled
            placeholder="DD/MM/YYYY"
            defaultValue={
              selectedProfile
                ? format(parseISO(selectedProfile.DOB), "dd/MM/yyyy")
                : ""
            }
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Ghi chú
          </label>
          <Textarea placeholder="Nhập ghi chú hoặc yêu cầu đặc biệt" rows={3} />
        </div>
      </div>
    </>
  );
};
export default ProfileInfo;
