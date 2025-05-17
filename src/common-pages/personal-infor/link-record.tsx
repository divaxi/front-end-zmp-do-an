import React, { useState } from "react";
import { Page, Button, Input, Sheet } from "zmp-ui";
import { useNavigate } from "react-router-dom";

export default function LinkHealthRecordPage() {
  const navigate = useNavigate();
  const [recordCode, setRecordCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showOtpSheet, setShowOtpSheet] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("******827"); // Số điện thoại ẩn một phần
  const [otpSent, setOtpSent] = useState(false);

  const handleSubmit = async () => {
    if (!recordCode.trim()) {
      setError("Vui lòng nhập mã định danh tài khoản");
      return;
    }

    setIsLoading(true);
    setError("");
    setPhoneNumber("******827");

    try {
      // Giả lập gọi API để kiểm tra mã định danh
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Hiển thị sheet OTP sau khi kiểm tra mã định danh thành công
      setShowOtpSheet(true);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setError("Không thể liên kết hồ sơ. Vui lòng kiểm tra mã và thử lại.");
      setIsLoading(false);
    }
  };

  const handleSendOtp = async () => {
    setIsLoading(true);
    try {
      // Giả lập gọi API để gửi OTP
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setOtpSent(true);
      setShowOtpSheet(false); // Đóng sheet
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      // Giả lập gọi API để gửi lại OTP
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Có thể hiển thị thông báo đã gửi lại OTP
    } catch (err) {
      console.log(err);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otpCode.trim()) {
      // Hiển thị lỗi OTP nếu cần
      return;
    }

    setIsLoading(true);

    console.log("otpCode: ", otpCode);
    try {
      // Giả lập gọi API để xác thực OTP
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Sau khi liên kết thành công, chuyển hướng về trang hồ sơ
      navigate("/profile/personal-info");
    } catch (err) {
      console.log(err);
      // Hiển thị lỗi OTP nếu cần
    } finally {
      setIsLoading(false);
    }
  };

  // Nếu OTP đã được gửi, hiển thị màn hình nhập OTP
  if (otpSent) {
    return (
      <Page className="bg-gray-50 min-h-screen">
        <div className="p-4 flex flex-col h-full items-center">
          <div className="w-full max-w-md">
            <div className="text-center mb-6 mt-4">
              <h3 className="font-medium mb-2">
                Mã OTP gồm 7 số được gửi về tài khoản Zalo
              </h3>
              <p className="text-center">{phoneNumber}</p>
            </div>

            <Input.OTP
              show={true}
              otpLength={6}
              defaultValue={""}
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
              className="mb-4 w-full"
            />

            <div className="text-center mb-6">
              <p className="text-sm text-gray-600">
                Chưa nhận được mã?
                <span
                  className="text-blue-500 ml-1 cursor-pointer"
                  onClick={handleResendOtp}
                >
                  Gửi lại ngay
                </span>
              </p>
            </div>

            <Button
              fullWidth
              className="bg-[#0095FF] text-white rounded-md h-12"
              onClick={handleVerifyOtp}
              loading={isLoading}
              disabled={isLoading}
            >
              Xác nhận
            </Button>
          </div>
        </div>
      </Page>
    );
  }

  return (
    <Page className="bg-gray-50 min-h-screen">
      <div className="p-4 flex flex-col h-full">
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            Vui lòng cung cấp thông tin định danh tài khoản
          </p>
        </div>

        <div className="flex-grow">
          <Input
            label=""
            placeholder="Nhập mã định danh"
            value={recordCode}
            onChange={(e) => setRecordCode(e.target.value)}
            className="mb-2"
            clearable
          />

          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          <Button
            fullWidth
            className="bg-[#0095FF] text-white rounded-md h-12 mt-4"
            onClick={handleSubmit}
            loading={isLoading}
            disabled={isLoading}
          >
            Xác nhận
          </Button>
        </div>
      </div>

      {/* Sheet xác nhận OTP */}
      <Sheet
        visible={showOtpSheet}
        onClose={() => setShowOtpSheet(false)}
        autoHeight
        mask
        handler
        swipeToClose
      >
        <div className="p-4 flex flex-col items-center">
          <h3 className="text-center mb-2">Gửi mã xác nhận OTP đến số Zalo</h3>
          <p className="text-center mb-6">{phoneNumber}</p>

          <Button
            fullWidth
            className="bg-[#0095FF] text-white rounded-md h-12 mb-7"
            onClick={handleSendOtp}
            loading={isLoading}
            disabled={isLoading}
          >
            Xác nhận
          </Button>
        </div>
      </Sheet>
    </Page>
  );
}
