import {
  BookIcon,
  HomeIcon,
  // HSSKIcon,
  // NotificationIcon,
  ProfileIcon,
} from "./vectors";
import HorizontalDivider from "./horizontal-divider";
// import { useAtomValue } from "jotai";
// import { cartState } from "@/state";
import TransitionLink from "./transition-link";
import { ChartLineIcon } from "lucide-react";

const NAV_ITEMS = [
  {
    name: "Trang chủ",
    path: "/",
    icon: HomeIcon,
  },
  // {
  //   name: "Đặt lịch",
  //   path: "/booking",
  //   icon: BookIcon,
  // },
  {
    name: "Lịch hẹn",
    path: "/appointment",
    icon: BookIcon,
  },
  {
    name: "Thống kê",
    path: "/satistic",
    icon: () => <ChartLineIcon className="scale-90" />,
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
  return (
    <>
      <HorizontalDivider />
      <div
        className="w-full px-4 pt-2 grid"
        style={{
          gridTemplateColumns: `repeat(${NAV_ITEMS.length}, 1fr)`,
          paddingBottom: `max(16px, env(safe-area-inset-bottom)`,
        }}
      >
        {NAV_ITEMS.map((item) => {
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
                  <div
                    className={`text-2xs ${isActive ? "text-[#0891B3]" : ""}`}
                  >
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
