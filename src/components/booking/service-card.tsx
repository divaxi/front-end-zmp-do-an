import { useNavigate } from "react-router-dom"; // Import useNavigate

interface ServiceCategoryCardProps {
  title: string;
  description: string;
  serviceId: string;
}

export default function ServiceCategoryCard({
  title,
  description,
  serviceId,
}: ServiceCategoryCardProps) {
  const navigate = useNavigate();

  const handleBookClick = () => {
    navigate(`/booking/time-slot/${serviceId}`, {
      state: {
        serviceName: title,
      },
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4 border border-gray-100">
      <h3 className="text-base font-semibold mb-1 text-gray-800">{title}</h3>{" "}
      {/* Title */}
      <p className="text-sm text-gray-500 mb-3 leading-relaxed">
        {description}
      </p>{" "}
      {/* Description */}
      <button
        onClick={() => {
          handleBookClick();
        }} // Gọi hàm xử lý khi click
        // Sử dụng màu teal tương tự ảnh, có thể thay bằng màu primary của bạn nếu muốn
        className="bg-[#0891B2] hover:bg-[#0E7490] text-white text-sm font-medium py-1.5 px-5 rounded-full transition-colors"
      >
        Đặt lịch
      </button>
    </div>
  );
}
