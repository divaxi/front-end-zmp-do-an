import React from "react";
import { Bell, Calendar, User } from "lucide-react";

export default function FooterNavigation() {
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white px-2 py-1">
      <div className="grid grid-cols-5 gap-1">
        <div className="flex flex-col items-center text-cyan-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-home"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span className="text-[10px]">Trang chủ</span>
        </div>
        <div className="flex flex-col items-center text-gray-500">
          <Calendar className="h-5 w-5" />
          <span className="text-[10px]">Đặt lịch</span>
        </div>
        <div className="flex flex-col items-center text-gray-500">
          <svg
            width="20"
            height="19"
            viewBox="0 0 22 19"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M11 2.71053C11.5863 1.83781 12.277 1.16788 13.0721 0.700727C13.8672 0.233576 14.7113 0 15.6047 0C16.9939 0 18.1703 0.50643 19.1339 1.51929C20.0974 2.53196 20.6212 3.81491 20.7051 5.36814C20.7051 5.41962 20.7034 5.46729 20.7002 5.51115C20.697 5.55519 20.692 5.60286 20.6854 5.65415C20.6959 5.89764 20.6277 6.10157 20.4807 6.26593C20.3339 6.4301 20.1516 6.5181 19.9338 6.52992C19.716 6.54155 19.5337 6.46528 19.3869 6.30111C19.2399 6.13675 19.1611 5.93282 19.1507 5.68933C19.1572 5.63804 19.1621 5.59037 19.1653 5.54633C19.1686 5.50247 19.1702 5.4548 19.1702 5.40332C19.1073 4.32983 18.7409 3.44691 18.0712 2.75457C17.4015 2.06223 16.5793 1.71607 15.6047 1.71607C14.8897 1.71607 14.2214 1.91961 13.5996 2.3267C12.9776 2.7336 12.4469 3.31182 12.0074 4.06136C11.8802 4.26957 11.7244 4.42764 11.54 4.53556C11.3558 4.64329 11.1673 4.69716 10.9744 4.69716C10.7815 4.69716 10.5973 4.64329 10.4216 4.53556C10.2458 4.42764 10.0995 4.26957 9.98263 4.06136C9.54314 3.31182 9.01412 2.7336 8.39556 2.3267C7.777 1.91961 7.11026 1.71607 6.39535 1.71607C5.4207 1.71607 4.59851 2.06223 3.92879 2.75457C3.25907 3.44691 2.89274 4.32983 2.82981 5.40332C2.82981 5.4548 2.83143 5.50247 2.83467 5.54633C2.83791 5.59037 2.84278 5.63804 2.84926 5.68933C2.83885 5.93282 2.76015 6.13675 2.61314 6.30111C2.4663 6.46528 2.28399 6.54155 2.06621 6.52992C1.84843 6.5181 1.66612 6.4301 1.51928 6.26593C1.37227 6.10157 1.30405 5.89764 1.31463 5.65415C1.30798 5.60286 1.30303 5.55519 1.29979 5.51115C1.29655 5.46729 1.29493 5.41962 1.29493 5.36814C1.37884 3.81491 1.90257 2.53196 2.86614 1.51929C3.82971 0.50643 5.00611 0 6.39535 0C7.28865 0 8.13284 0.233576 8.92791 0.700727C9.72298 1.16788 10.4137 1.83781 11 2.71053Z" />
          </svg>
          <span className="text-[10px]">Điều trị</span>
        </div>
        <div className="flex flex-col items-center text-gray-500">
          <Bell className="h-5 w-5" />
          <span className="text-[10px]">Thông báo</span>
        </div>
        <div className="flex flex-col items-center text-gray-500">
          <User className="h-5 w-5" />
          <span className="text-[10px]">Cá nhân</span>
        </div>
      </div>
    </div>
  );
}
