import {
  BookIcon,
  ChatbotIcon,
  HomeIcon,
  ProfileIcon,
  SatisticIcon,
} from "./vectors";
import HorizontalDivider from "./horizontal-divider";
import TransitionLink from "./transition-link";
import { useAtomValue } from "jotai";
import { authState } from "@/state";

const CustomerOnly = [
  {
    name: "Chatbot",
    path: "/chatbot",
    icon: ChatbotIcon,
  },
  {
    name: "Lịch hẹn",
    path: "/appointment",
    icon: BookIcon,
  },
];

const StaffOnly = [
  {
    name: "Thống kê",
    path: "/satistic",
    icon: SatisticIcon,
  },
  {
    name: "Lịch hẹn",
    path: "/appointment-staff",
    icon: BookIcon,
  },
];

const NAV_ITEMS = [
  {
    name: "Trang chủ",
    path: "/",
    icon: HomeIcon,
  },

  // {
  //   name: "Thông báo",
  //   path: "/cart",
  //   icon: (props) => {
  //     // eslint-disable-next-line
  //     const cart = useAtomValue(cartState);
  //
  //     return (
  //       <div className="relative">
  //         {cart.length >= 0 && (
  //           <div className="absolute top-0 left-[18px] h-4 px-1.5 pt-[1.5px] pb-[0.5px] rounded-full bg-[#FF3333] text-white text-[10px] leading-[14px] font-medium shadow-[0_0_0_2px_white]">
  //             {cart.length > 9 ? "9+" : cart.length}
  //           </div>
  //         )}
  //         <NotificationIcon {...props} />
  //       </div>
  //     );
  //   },
  // },
  {
    name: "Cá nhân",
    path: "/profile",
    icon: ProfileIcon,
  },
];

export default function Footer() {
  const auth = useAtomValue(authState);
  const items = !!auth?.staff
    ? [...NAV_ITEMS, ...StaffOnly]
    : [...NAV_ITEMS, ...CustomerOnly];
  return (
    <>
      <HorizontalDivider />
      <div
        className="w-full px-4 pt-2 grid"
        style={{
          gridTemplateColumns: `repeat(${items.length}, 1fr)`,
          paddingBottom: `max(16px, env(safe-area-inset-bottom)`,
        }}
      >
        {items.map((item) => {
          return (
            <TransitionLink
              to={item.path}
              key={item.path}
              className="flex flex-col items-center space-y-0.5 p-1 pb-0.5 cursor-pointer active:scale-105"
            >
              {({ isActive }) => (
                <>
                  <div className="w-6 h-6 flex justify-center items-center">
                    <item.icon active={isActive} />
                  </div>
                  <div className={`text-2xs ${isActive ? "text-primary" : ""}`}>
                    {item.name}
                  </div>
                </>
              )}
            </TransitionLink>
          );
        })}
      </div>
    </>
  );
}
