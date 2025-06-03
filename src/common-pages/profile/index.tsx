import OtherAction from "@/components/profile/other-action";
import Individual from "@/components/profile/individual";
import MiniAppQR from "@/components/profile/miniapp-qr";
import UserInfo from "@/components/profile/user-info";
export default function ProfilePage() {
  return (
    <div className="min-h-full bg-section space-y-2 pb-2">
      <UserInfo />
      <Individual />
      <OtherAction />
      <MiniAppQR />
    </div>
  );
}
