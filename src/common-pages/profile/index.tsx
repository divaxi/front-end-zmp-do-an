import FollowOA from "@/components/profile/follow-oa";
import OtherAction from "@/components/profile/other-action";
import AppInfor from "@/components/profile/app-infor";
import Individual from "@/components/profile/individual";
import MiniAppQR from "@/components/profile/miniapp-qr";
export default function ProfilePage() {
  return (
    <div className="min-h-full bg-section space-y-2 pb-2">
      <FollowOA />
      <Individual />
      <OtherAction />
      <AppInfor />
      <MiniAppQR />
    </div>
  );
}
