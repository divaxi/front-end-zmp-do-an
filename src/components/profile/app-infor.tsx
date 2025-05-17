import { InformationCircleIcon } from "@/components/vectors";
import packageJson from "../../../package.json";

export default function AppInfor() {
  const actions = [
    {
      label: "Bookie Mini App phiên bản " + packageJson.version,
      icon: InformationCircleIcon,
      onClick: () => {},
      className: "text-gray-800", // Default text color
      iconClassName: "text-gray-500", // Default icon color
    },
  ];

  return (
    <div className="bg-white">
      <div className="p-4 pb-0 font-medium text-gray-500">
        Thông tin ứng dụng
      </div>
      {actions.map((action, index) => (
        <div key={action.label}>
          <div
            className="flex items-center justify-between p-4 cursor-pointer" // Bỏ border-b ở đây
            onClick={action.onClick}
          >
            <div className="flex items-center space-x-3">
              <action.icon className={`w-5 h-5 ${action.iconClassName}`} />
              <span className={`text-base ${action.className}`}>
                {action.label}
              </span>
            </div>
          </div>
          {index < actions.length - 1 && (
            <div className="h-[0.5px] bg-black/5 mx-6"></div> // Đường kẻ với margin ngang (mx-4)
          )}
        </div>
      ))}
    </div>
  );
}
