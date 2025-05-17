import { PatientData } from "@/types";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Input, Select, DatePicker } from "zmp-ui";

// Dữ liệu mẫu cho tỉnh/thành phố, quận/huyện, xã/phường
const provinces = [
  { id: "01", name: "Hà Nội" },
  { id: "02", name: "TP. Hồ Chí Minh" },
  { id: "03", name: "Đà Nẵng" },
  { id: "04", name: "Hải Phòng" },
  // Thêm các tỉnh/thành phố khác
];

// Dữ liệu mẫu cho quận/huyện (sẽ được lọc theo tỉnh/thành phố đã chọn)
const districts = {
  "01": [
    { id: "001", name: "Quận Ba Đình" },
    { id: "002", name: "Quận Hoàn Kiếm" },
    { id: "003", name: "Quận Tây Hồ" },
    { id: "004", name: "Quận Long Biên" },
    // Thêm các quận/huyện khác của Hà Nội
  ],
  "02": [
    { id: "001", name: "Quận 1" },
    { id: "002", name: "Quận 2" },
    { id: "003", name: "Quận 3" },
    { id: "004", name: "Quận 4" },
    // Thêm các quận/huyện khác của TP. HCM
  ],
  // Thêm các quận/huyện cho các tỉnh/thành phố khác
};

// Dữ liệu mẫu cho xã/phường (sẽ được lọc theo quận/huyện đã chọn)
const wards = {
  "001": [
    { id: "00001", name: "Phường Phúc Xá" },
    { id: "00002", name: "Phường Trúc Bạch" },
    { id: "00003", name: "Phường Vĩnh Phúc" },
    // Thêm các phường khác của Quận Ba Đình
  ],
  "002": [
    { id: "00001", name: "Phường Hàng Bạc" },
    { id: "00002", name: "Phường Hàng Bồ" },
    { id: "00003", name: "Phường Hàng Đào" },
    // Thêm các phường khác của Quận Hoàn Kiếm
  ],
  // Thêm các xã/phường cho các quận/huyện khác
};

const labelClass = "block text-sm mb-2";

export default function DetailInfoPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = id ? true : false;
  const [patientData, setPatientData] = useState<PatientData>({
    Ten: "",
    Sex: 1,
    DOB: new Date(),
    CCCD: "",
    Mobile: "",
    Address: "",
    BHYT: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // State cho danh sách quận/huyện và xã/phường dựa trên lựa chọn
  const [availableDistricts, setAvailableDistricts] = useState<
    { id: string; name: string }[]
  >([]);
  const [availableWards, setAvailableWards] = useState<
    { id: string; name: string }[]
  >([]);

  useEffect(() => {
    if (isEditMode && id) {
      // Trong trường hợp thực tế, bạn sẽ fetch dữ liệu từ API dựa trên id
      // Đây là mô phỏng việc lấy dữ liệu
      setLoading(true);
      setTimeout(() => {
        // Dữ liệu mẫu
        setPatientData({
          Id: id,
          Ten: "Nguyễn Văn A",
          Sex: 1,
          DOB: new Date("1990-01-01"),
          CCCD: "012345678901",
          Mobile: "0987654321",
          ProvinceId: "01",
          DistrictId: "001",
          WardsId: "00001",
          Address: "123 Đường ABC, Phường XYZ",
          BHYT: "SV12345678",
          DanTocId: "01",
          NgheNghiepId: "02",
          NationalId: "VN",
          CCCDNoiCap: "Cục Cảnh sát",
          CCCDNgayCap: new Date("2020-01-01"),
          QRCode: "qr123456",
          BHYTMaDKBD: "01234",
          BHYTHieuLucTuNgay: new Date("2023-01-01"),
          BHYTHieuLucDenNgay: new Date("2023-12-31"),
          CanNang: 65,
          ChieuCao: 170,
        });
        setLoading(false);
      }, 1000);
    }
  }, [id, isEditMode]);

  // Cập nhật danh sách quận/huyện khi tỉnh/thành phố thay đổi
  useEffect(() => {
    if (patientData.ProvinceId) {
      setAvailableDistricts(districts[patientData.ProvinceId] || []);
      // Reset quận/huyện và xã/phường nếu tỉnh/thành phố thay đổi
      if (!isEditMode) {
        setPatientData((prev) => ({
          ...prev,
          DistrictId: "",
          WardsId: "",
        }));
        setAvailableWards([]);
      }
    } else {
      setAvailableDistricts([]);
      setAvailableWards([]);
    }
  }, [patientData.ProvinceId, isEditMode]);

  // Cập nhật danh sách xã/phường khi quận/huyện thay đổi
  useEffect(() => {
    if (patientData.DistrictId) {
      setAvailableWards(wards[patientData.DistrictId] || []);
      // Reset xã/phường nếu quận/huyện thay đổi
      if (!isEditMode) {
        setPatientData((prev) => ({
          ...prev,
          WardsId: "",
        }));
      }
    } else {
      setAvailableWards([]);
    }
  }, [patientData.DistrictId, isEditMode]);

  const handleInputChange = (
    field: keyof PatientData,
    value: PatientData[keyof PatientData]
  ) => {
    setPatientData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    // Validate dữ liệu
    if (!patientData.Ten) {
      setError("Vui lòng nhập họ tên");
      return;
    }

    if (!patientData.Mobile) {
      setError("Vui lòng nhập số điện thoại");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Trong trường hợp thực tế, bạn sẽ gửi dữ liệu lên API
      // Đây là mô phỏng việc lưu dữ liệu
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Sau khi lưu thành công, quay lại trang danh sách
      navigate("/profile/personal-info");
    } catch (err) {
      console.error(err);
      setError("Có lỗi xảy ra khi lưu thông tin. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="p-4 pb-6">
        {isEditMode && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg">
            <p className="font-bold text-blue-600">
              Hồ sơ: {patientData.Ten} -{" "}
              {patientData.Sex === 1
                ? "Nam"
                : patientData.Sex === 0
                  ? "Nữ"
                  : "Khác"}{" "}
              - {patientData.CCCD}
            </p>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 text-red-600 rounded-lg mb-4">
                {error}
              </div>
            )}

            {/* Thông tin cơ bản */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium mb-3 text-gray-800">
                Thông tin cơ bản
              </h2>

              <div className="space-y-3">
                <div>
                  <Input
                    label="Họ và tên"
                    labelClassName={labelClass}
                    placeholder="Nhập họ và tên"
                    value={patientData.Ten || ""}
                    onChange={(e) => handleInputChange("Ten", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className={labelClass}>Giới tính</label>
                  <Select
                    value={patientData.Sex?.toString()}
                    onChange={(value) =>
                      handleInputChange("Sex", parseInt(value))
                    }
                    placeholder="Chọn giới tính"
                  >
                    <option value="1">Nam</option>
                    <option value="0">Nữ</option>
                    <option value="2">Khác</option>
                  </Select>
                </div>

                <div>
                  <label className={labelClass}>Ngày sinh</label>
                  <DatePicker
                    value={
                      patientData.DOB ? new Date(patientData.DOB) : undefined
                    }
                    onChange={(date) => handleInputChange("DOB", date)}
                    title="Chọn ngày sinh"
                  />
                </div>

                <div>
                  <Input
                    label="Số điện thoại"
                    labelClassName={labelClass}
                    placeholder="Nhập số điện thoại"
                    value={patientData.Mobile || ""}
                    onChange={(e) =>
                      handleInputChange("Mobile", e.target.value)
                    }
                    type="tel"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Thông tin địa chỉ */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium mb-3 text-gray-800">
                Thông tin địa chỉ
              </h2>

              <div className="space-y-3">
                <div>
                  <label className={labelClass}>Tỉnh/Thành phố</label>
                  <Select
                    value={patientData.ProvinceId || ""}
                    onChange={(value) => handleInputChange("ProvinceId", value)}
                    placeholder="Chọn tỉnh/thành phố"
                  >
                    {provinces.map((province) => (
                      <option key={province.id} value={province.id}>
                        {province.name}
                      </option>
                    ))}
                  </Select>
                </div>

                <div>
                  <label className={labelClass}>Quận/Huyện</label>
                  <Select
                    value={patientData.DistrictId || ""}
                    onChange={(value) => handleInputChange("DistrictId", value)}
                    placeholder="Chọn quận/huyện"
                    disabled={!patientData.ProvinceId}
                  >
                    {availableDistricts.map((district) => (
                      <option key={district.id} value={district.id}>
                        {district.name}
                      </option>
                    ))}
                  </Select>
                </div>

                <div>
                  <label className={labelClass}>Xã/Phường</label>
                  <Select
                    value={patientData.WardsId || ""}
                    onChange={(value) => handleInputChange("WardsId", value)}
                    placeholder="Chọn xã/phường"
                    disabled={!patientData.DistrictId}
                  >
                    {availableWards.map((ward) => (
                      <option key={ward.id} value={ward.id}>
                        {ward.name}
                      </option>
                    ))}
                  </Select>
                </div>

                <div>
                  <Input
                    label="Địa chỉ chi tiết"
                    labelClassName={labelClass}
                    placeholder="Nhập số nhà, tên đường"
                    value={patientData.Address || ""}
                    onChange={(e) =>
                      handleInputChange("Address", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>

            {/* Thông tin CCCD */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium mb-3 text-gray-800">
                Thông tin CCCD/CMND
              </h2>

              <div className="space-y-3">
                <div>
                  <Input
                    label="Số CCCD/CMND"
                    labelClassName={labelClass}
                    placeholder="Nhập số CCCD/CMND"
                    value={patientData.CCCD || ""}
                    onChange={(e) => handleInputChange("CCCD", e.target.value)}
                  />
                </div>

                <div>
                  <Input
                    label="Nơi cấp"
                    labelClassName={labelClass}
                    placeholder="Nhập nơi cấp"
                    value={patientData.CCCDNoiCap || ""}
                    onChange={(e) =>
                      handleInputChange("CCCDNoiCap", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className={labelClass}>Ngày cấp</label>
                  <DatePicker
                    value={
                      patientData.CCCDNgayCap
                        ? new Date(patientData.CCCDNgayCap)
                        : undefined
                    }
                    onChange={(date) => handleInputChange("CCCDNgayCap", date)}
                    title="Chọn ngày cấp"
                  />
                </div>
              </div>
            </div>

            {/* Thông tin BHYT */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium mb-3 text-gray-800">
                Thông tin BHYT
              </h2>

              <div className="space-y-3">
                <div>
                  <Input
                    label="Số thẻ BHYT"
                    labelClassName={labelClass}
                    placeholder="Nhập số thẻ BHYT"
                    value={patientData.BHYT || ""}
                    onChange={(e) => handleInputChange("BHYT", e.target.value)}
                  />
                </div>

                <div>
                  <Input
                    label="Mã đăng ký KCB ban đầu"
                    labelClassName={labelClass}
                    placeholder="Nhập mã ĐKBD"
                    value={patientData.BHYTMaDKBD || ""}
                    onChange={(e) =>
                      handleInputChange("BHYTMaDKBD", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className={labelClass}>Hiệu lực từ ngày</label>
                  <DatePicker
                    value={
                      patientData.BHYTHieuLucTuNgay
                        ? new Date(patientData.BHYTHieuLucTuNgay)
                        : undefined
                    }
                    onChange={(date) =>
                      handleInputChange("BHYTHieuLucTuNgay", date)
                    }
                    title="Chọn ngày bắt đầu hiệu lực"
                  />
                </div>

                <div>
                  <label className={labelClass}>Hiệu lực đến ngày</label>
                  <DatePicker
                    value={
                      patientData.BHYTHieuLucDenNgay
                        ? new Date(patientData.BHYTHieuLucDenNgay)
                        : undefined
                    }
                    onChange={(date) =>
                      handleInputChange("BHYTHieuLucDenNgay", date)
                    }
                    title="Chọn ngày kết thúc hiệu lực"
                  />
                </div>
              </div>
            </div>

            {/* Thông tin thể chất */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium mb-3 text-gray-800">
                Thông tin thể chất
              </h2>

              <div className="space-y-3">
                <div>
                  <Input
                    label="Cân nặng (kg)"
                    labelClassName={labelClass}
                    placeholder="Nhập cân nặng"
                    value={patientData.CanNang?.toString() || ""}
                    onChange={(e) =>
                      handleInputChange("CanNang", parseFloat(e.target.value))
                    }
                    type="number"
                  />
                </div>

                <div>
                  <Input
                    label="Chiều cao (cm)"
                    labelClassName={labelClass}
                    placeholder="Nhập chiều cao"
                    value={patientData.ChieuCao?.toString() || ""}
                    onChange={(e) =>
                      handleInputChange("ChieuCao", parseFloat(e.target.value))
                    }
                    type="number"
                  />
                </div>
              </div>
            </div>

            {/* Nút lưu */}
            <Button
              fullWidth
              className="bg-[#0095FF] text-white rounded-md h-12 mt-6 text-lg"
              onClick={handleSubmit}
              loading={loading}
              disabled={loading}
            >
              {isEditMode ? "Cập nhật thông tin" : "Thêm hồ sơ"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
