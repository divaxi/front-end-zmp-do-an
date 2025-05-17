import { OpenAPI } from "@/client/api";
import loginWithZalo from "@/client/services/loginZalo";
import {
  ShieldIcon,
  PhoneIcon,
  LogoutIcon,
  ChevronRight,
} from "@/components/vectors";
import { useToBeImplemented } from "@/hooks";
import { userAtom } from "@/state";
import { useSetAtom } from "jotai";

export default function OtherActions() {
  const toBeImplemented = useToBeImplemented();
  const setUser = useSetAtom(userAtom);

  const actions = [
    {
      label: "Điều khoản & Chính sách quyền riêng tư",
      icon: ShieldIcon,
      onClick: async () => {
        const user = await loginWithZalo();
        if (!user) {
          console.warn("No User");
        } else {
          setUser(user);
          OpenAPI.TOKEN = user.JwtToken;
        }
      },
      className: "text-gray-800", // Default text color
      iconClassName: "text-gray-500", // Default icon color
    },
    {
      label: "Ghim ra màn hình chính",
      icon: PhoneIcon,
      onClick: toBeImplemented,
      className: "text-gray-800",
      iconClassName: "text-gray-500",
    },
    {
      label: "Đăng xuất",
      icon: LogoutIcon,
      onClick: toBeImplemented, // Replace with actual logout logic
      className: "text-danger", // Use danger color from theme
      iconClassName: "text-danger", // Use danger color for icon too
    },
  ];

  return (
    <div className="bg-white">
      <div className="p-4 pb-0 font-medium text-gray-500">Khác</div>
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
