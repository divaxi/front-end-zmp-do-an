import { loginWithZalo, logout } from "@/client/services/auth";
import {
  ShieldIcon,
  PhoneIcon,
  LogoutIcon,
  ChevronRight,
} from "@/components/vectors";
import { useToBeImplemented } from "@/hooks";
import { authState } from "@/state";
import { useAtom } from "jotai";
import { LogInIcon } from "lucide-react";
import { useSnackbar } from "zmp-ui";

export default function OtherActions() {
  const toBeImplemented = useToBeImplemented();
  const { openSnackbar } = useSnackbar();
  const [user, setUser] = useAtom(authState);

  const actions = [
    {
      label: "Điều khoản & Chính sách quyền riêng tư",
      icon: ShieldIcon,
      onClick: toBeImplemented,
      className: "text-gray-800",
      iconClassName: "text-gray-500",
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
      onClick: () => {
        logout();
        setUser(undefined);
        openSnackbar({
          type: "info",
          text: "Đăng xuất thành công",
        });
      },
      className: "text-danger",
      iconClassName: "text-danger",
    },
    {
      label: "Đăng nhập",
      icon: LogInIcon,
      onClick: () => {
        loginWithZalo()
          .then((user) => {
            setUser(user);
            openSnackbar({
              type: "success",
              text: "Đăng nhập thành công",
            });
          })
          .catch(() =>
            openSnackbar({
              type: "error",
              text: "Đăng nhập thất bại",
            })
          );
      },
      className: "text-primary",
      iconClassName: "text-primary",
    },
  ];

  const filteredActions = actions.filter((action) => {
    return !user ? action.label !== "Đăng xuất" : action.label !== "Đăng nhập";
  });

  return (
    <div className="bg-white">
      <div className="p-4 pb-0 font-medium text-gray-500">Khác</div>
      {filteredActions.map((action, index) => (
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
