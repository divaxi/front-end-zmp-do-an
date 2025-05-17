import React from "react";

interface ProviderCardProps {
  avatar: string;
  name: string;
  description: string;
  providerId: string | number;
  onClick: (providerId: string | number) => void; // Hàm xử lý khi chọn provider
}

export default function ProviderCard({
  avatar,
  name,
  description,
  providerId,
  onClick,
}: ProviderCardProps) {
  return (
    <div
      className="bg-white rounded-lg shadow p-4 mb-4 flex items-center space-x-4 cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={() => onClick(providerId)} // Gọi hàm onClick khi nhấn vào card
    >
      {/* Avatar */}
      <img
        src={avatar}
        alt={`Avatar của ${name}`}
        className="w-14 h-14 rounded-full object-cover border border-gray-200 flex-shrink-0" // Thêm flex-shrink-0
      />
      {/* Info */}
      <div className="flex-grow min-w-0">
        {/* Thêm flex-grow và min-w-0 để xử lý text dài */}
        <h4 className="text-base font-semibold text-gray-800 truncate">
          {name}
        </h4>{" "}
        {/* Thêm truncate */}
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
          {/* Giới hạn 2 dòng */}
          {description}
        </p>
      </div>
    </div>
  );
}
