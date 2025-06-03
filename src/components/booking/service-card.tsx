import { useNavigate } from "react-router-dom"; // Import useNavigate

interface ServiceCategoryCardProps {
  title: string;
  description: string;
  // Thay vì onBook, có thể truyền categoryId hoặc slug để điều hướng
}

export default function ServiceCategoryCard({
  title,
  description,
}: ServiceCategoryCardProps) {
  const navigate = useNavigate(); // Khởi tạo hook điều hướng

  // Hàm xử lý khi nhấn nút "Đặt lịch"
  // const handleBookClick = () => {
  //   // Điều hướng đến trang chi tiết hoặc trang đặt lịch cho category này
  //   // Ví dụ: điều hướng đến trang chọn dịch vụ cụ thể trong category đó
  //   navigate(`/booking/provider/${categoryId}`, {
  //     state: { serviceName: title },
  //   });
  //   // Hoặc nếu bạn có một trang đặt lịch chung nhận categoryId
  //   // navigate(`/booking/appointment?category=${categoryId}`);
  // };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4 border border-gray-100">
      <h3 className="text-base font-semibold mb-1 text-gray-800">{title}</h3>{" "}
      {/* Title */}
      <p className="text-sm text-gray-500 mb-3 leading-relaxed">
        {description}
      </p>{" "}
      {/* Description */}
      <button
        onClick={() => { }} // Gọi hàm xử lý khi click
        // Sử dụng màu teal tương tự ảnh, có thể thay bằng màu primary của bạn nếu muốn
        className="bg-[#0891B2] hover:bg-[#0E7490] text-white text-sm font-medium py-1.5 px-5 rounded-full transition-colors"
      >
        Đặt lịch
      </button>
    </div>
  );
}
