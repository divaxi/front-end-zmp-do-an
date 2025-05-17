import React from "react";
import { Bell, User } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";

export default function HeaderSection() {
  return (
    <div className="bg-cyan-500 p-4 text-white">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 bg-white">
            <div className="flex items-center justify-center h-full w-full">
              <User className="h-4 w-4 text-cyan-500" />
            </div>
          </Avatar>
          <div>
            <p className="text-sm font-medium">Nguyễn Phương Anh</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="rounded-md p-1">
            <Bell className="h-5 w-5" />
          </button>
          <button className="rounded-md p-1">
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
              className="lucide lucide-x"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
