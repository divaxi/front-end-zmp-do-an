import { ChevronRight, ProfileIcon } from "@/components/vectors";
import { useNavigate } from "react-router-dom";
export default function Individual() {
  const navigate = useNavigate(); // Khởi tạo hook điều hướng

  const handlePersonalInfo = () => {
    navigate("/profile/personal-info");
  };

  const actions = [
    {
      label: "Thông tin cá nhân",
      icon: ProfileIcon,
      onClick: handlePersonalInfo,
      className: "text-gray-800", // Default text color
      iconClassName: "text-gray-500", // Default icon color
    },
  ];

  return (
    <div className="bg-white">
      <div className="p-4 pb-0 font-medium text-gray-500">Cá nhân</div>
      {actions.map((action, index) => (
        <div key={action.label}>
          <div
            className="flex items-center justify-between p-4 cursor-pointer" // Bỏ border-b ở đây
            onClick={action.onClick}
          >
            <div className="flex items-center space-x-3">
              <action.icon active={false} />
              <span className={`text-base ${action.className}`}>
                {action.label}
              </span>
            </div>
            <ChevronRight />
          </div>
          {index < actions.length - 1 && (
            <div className="h-[0.5px] bg-black/5 mx-6"></div> // Đường kẻ với margin ngang (mx-4)
          )}
        </div>
      ))}
    </div>
  );
}
