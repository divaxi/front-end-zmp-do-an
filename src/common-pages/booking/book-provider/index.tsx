import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Page, Icon } from "zmp-ui";
import ProviderCard from "@/components/booking/provider-card"; // Import component ProviderCard
// import { useBookingProvider } from "@/client/services/booking";
export default function BookProviderPage() {
  const { serviceId } = useParams<{ serviceId: string }>(); // Lấy serviceId từ URL
  const location = useLocation();
  const serviceName = location.state.serviceName;
  const navigate = useNavigate();
  // const { data: providers } = useBookingProvider(serviceId || "");

  // Hàm xử lý khi chọn một nhà cung cấp (provider)
  const handleProviderSelect = (
    providerId?: string | number,
    providerName?: string
  ) => {
    console.log(
      `Selected Service ID: ${serviceId}, Provider ID: ${providerId}`
    );
    // Điều hướng đến trang tiếp theo, ví dụ: chọn thời gian
    // Đảm bảo bạn đã định nghĩa route này trong router.tsx
    navigate(
      `/booking/time-slot?serviceId=${serviceId}&providerId=${providerId}`,
      {
        state: {
          serviceName: serviceName,
          providerName: providerName,
        },
      }
    );
  };

  // Hàm xử lý khi nhấn nút chỉnh sửa dịch vụ
  const handleEditService = () => {
    // Quay lại trang chọn dịch vụ
    navigate("/booking");
  };

  return (
    <Page className="flex flex-col bg-gray-100">
      {/* Header hiển thị dịch vụ đã chọn */}
      <div className="bg-white rounded-lg shadow p-4 m-4 mb-2 flex justify-between items-center sticky top-0 z-10">
        {" "}
        {/* Thêm sticky */}
        <span className="text-sm text-gray-600">
          Dịch vụ: <strong className="text-gray-800">{serviceName}</strong>
        </span>
        <button
          onClick={handleEditService}
          className="text-gray-400 hover:text-gray-600 p-1 -mr-1" // Thêm padding và margin âm để dễ nhấn hơn
        >
          <Icon icon="zi-edit" className="w-5 h-5" />
        </button>
      </div>

      {/* Danh sách các nhà cung cấp */}
      <div className="flex-grow p-4 pt-2 overflow-y-auto">
        {/* {!providers?.Value || providers?.Value?.length > 0 ? ( */}
        {/*   providers?.Value?.map((provider) => ( */}
        {/*     <ProviderCard */}
        {/*       key={provider.Id} */}
        {/*       avatar={provider.Name || ""} */}
        {/*       name={provider.Name || ""} */}
        {/*       description={provider.Description || ""} */}
        {/*       providerId={provider.Id || ""} */}
        {/*       onClick={() => handleProviderSelect(provider.Id, provider.Name)} // Truyền hàm xử lý vào props */}
        {/*     /> */}
        {/*   )) */}
        {/* ) : ( */}
        {/*   // Hiển thị thông báo nếu không có provider nào cho dịch vụ này */}
        {/*   <div className="text-center text-gray-500 mt-8"> */}
        {/*     Không tìm thấy nhà cung cấp nào cho dịch vụ này. */}
        {/*   </div> */}
        {/* )} */}
      </div>
    </Page>
  );
}
