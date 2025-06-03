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
      title: `Mini app nha khoa Kim Cương`,
      thumbnail: `https://i.imgur.com/PhOQtGH.jpeg`,
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
  const miniAppDeepLink = `https://zalo.me/s/${appConfig}`;

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
          <QrCodeDisplay value={miniAppDeepLink} size={200} logoSize={40} />

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
