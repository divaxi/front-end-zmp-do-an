import { authState } from "@/state";
import { useAtomValue } from "jotai";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserInfo() {
  const user = useAtomValue(authState);
  return (
    <div className="bg-white flex flex-col justify-center items-center gap-4 py-2">
      <Avatar className="h-[80px] w-[80px] border-2 border-primary bg-skeleton">
        <AvatarImage
          src={user?.auth?.user.avatar?.path || "https://github.com/shadcn.png"}
        />
        <AvatarFallback>{user?.auth?.user.userName}</AvatarFallback>
      </Avatar>
      <h2 className="font-bold text-xl ">{user?.auth?.user.userName}</h2>
    </div>
  );
}
