import { QrCodeDisplay } from "@/components/qr-code-display";
import { getConfig } from "@/utils/template";
import { Dispatch, useState } from "react";
import { SetStateAction } from "react";
import { openShareSheet, saveImageToGallery } from "zmp-sdk/apis";
import { Icon, useSnackbar } from "zmp-ui";
import { SnackbarOptions } from "zmp-ui/snackbar-provider";
import html2canvas from "html2canvas";

export const onCLickShareSheet = () => {
  openShareSheet({
    type: "zmp",
    data: {
      title: `Mini app Bookie Hub`,
      thumbnail: `https://scontent-hkg4-1.xx.fbcdn.net/v/t39.30808-6/241360303_101608758939310_4612246154167690337_n.png?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=2aa_WhV3bHMQ7kNvwFO69P0&_nc_oc=AdnLjgkoLGl81zCQHc5XEciE-aDLolBSHvt4jHPUD-5IRsGCAG6qJ5eKTztViTgeWASA_FI8-HfWUEViu_JBz-ye&_nc_zt=23&_nc_ht=scontent-hkg4-1.xx&_nc_gid=rVBvBinJBItQ7X9L5N3K6w&oh=00_AfFbnQJiuRqeh7XTTziehIezPt8Xk16Uub13ml8fuLsK6g&oe=67FAC9DA`,
      path: `/`,
    },
  });
};

export const onClickSaveDivAsBase64 = async (
  openSnackbar: (options: SnackbarOptions) => void,
  loading: boolean,
  setLoading: Dispatch<SetStateAction<boolean>>,
  elementId: string
) => {
  const node = document.getElementById(elementId);
  console.log(node);
  if (node) {
    if (!loading) {
      setLoading(true);
      try {
        const canvas = await html2canvas(node, {
          useCORS: true, // Cho phép tải ảnh từ nguồn khác
          backgroundColor: "#ffffff", // Đặt màu nền là trắng
          scale: 2, // Tăng scale để cải thiện độ phân giải
        });
        const base64Image = canvas.toDataURL("image/png");

        // Gửi base64 qua API hoặc lưu vào thiết bị, hàm của Zalo
        await saveImageToGallery({ imageBase64Data: base64Image }); // Hàm này giả sử gửi base64 qua API

        // Hiển thị thông báo thành công
        openSnackbar({
          text: "Lưu mã QR thành công",
          type: "success",
        });
        setLoading(false);
      } catch (error) {
        console.error("Error saving as Base64:", error);
        openSnackbar({
          text: "Lưu mã QR thất bại",
          type: "warning",
        });

        setLoading(false);
      }
    } else {
      openSnackbar({
        text: "Đang lưu thông tin lịch hẹn",
        type: "warning",
      });
    }
  } else {
    console.error("Element not found");
  }
};

export default function MiniAppQR() {
  const { openSnackbar } = useSnackbar();
  const [loading, setLoading] = useState<boolean>(false);

  const qrElementId = "miniAppQR";
  const appConfig = getConfig((config) => config.app);
  // const miniAppDeepLink = `https://zalo.me/s/${appConfig?.appId}`; // Ví dụ link, điều chỉnh nếu cần
  const miniAppDeepLink = `https://zalo.me/s/${appConfig}`;

  const logo =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0qcFJ-q9mX9HqDVeeFujghgWNyiD-kzTFzQ&s";

  const onCLickDownloadQR = () => {
    onClickSaveDivAsBase64(openSnackbar, loading, setLoading, qrElementId);
  };

  return (
    <div className="bg-white">
      <div className="p-4 pb-0 font-medium text-gray-500">
        Chia sẻ Mã QR tới cộng đồng
      </div>

      <div className="p-4 flex items-center justify-center flex-col space-y-4 bg-white">
        <div
          id="miniAppQR"
          className="flex items-center justify-center flex-col space-y-4"
        >
          <img
            src={logo}
            alt="QR"
            className="w-24 h-24"
            crossOrigin="anonymous"
          />

          <QrCodeDisplay
            value={miniAppDeepLink} // Truyền giá trị cần mã hóa
            size={200} // Kích thước QR code
            logoSrc={logo}
            logoSize={40}
          />

          <div className="text-sm text-gray-500 px-12 text-center">
            Chia sẻ mã QR này để bạn bè có thể sử dụng nhanh chóng
          </div>
        </div>

        <div className="flex flex-row space-x-8 justify-evenly items-center ">
          <div
            className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center"
            onClick={onCLickShareSheet}
          >
            <Icon icon="zi-share" />
          </div>
          <div
            className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center"
            onClick={onCLickDownloadQR}
          >
            <Icon icon="zi-download" />
          </div>
        </div>
      </div>
    </div>
  );
}
