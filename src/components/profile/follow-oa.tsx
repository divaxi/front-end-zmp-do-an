import { useEffect } from "react";
import { showOAWidget } from "zmp-sdk/apis";

export default function FollowOAWidget() {
  useEffect(() => {
    showOAWidget({
      id: "oaWidget",
      guidingText: "Nhận thông báo khuyến mãi mới nhất từ cửa hàng",
      color: "#0068FF",
      onStatusChange: (status) => {
        console.log(status);
      },
    });

    console.log("showOAWidget");
  }, []);

  return <div id="oaWidget" />;
}
