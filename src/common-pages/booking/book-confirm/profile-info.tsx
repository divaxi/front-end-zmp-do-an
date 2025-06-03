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
import { FC, useEffect } from "react";

interface props {
  onReadyChange?: (ready: boolean) => void;
}

const ProfileInfo: FC<props> = ({ onReadyChange }) => {
  useEffect(() => {
    onReadyChange?.(true);
  }, [onReadyChange]);
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
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Chọn hồ sơ của bạn" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="profile1">
                  Nguyễn Văn A 21/04/1986
                </SelectItem>
                <SelectItem value="profile2">Trần Mạnh B 30/02/2000</SelectItem>
                <SelectItem value="new">Tạo hồ sơ mới</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <label className="text-sm font-medium flex items-center">
            <User className="h-4 w-4 mr-2" />
            Họ và tên
          </label>
          <Input disabled placeholder="Nhập họ và tên của bạn" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center">
            <Phone className="h-4 w-4 mr-2" />
            Số điện thoại
          </label>
          <Input disabled placeholder="Nhập số điện thoại" type="tel" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Ngày sinh
          </label>
          <Input disabled placeholder="DD/MM/YYYY" type="date" />
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
