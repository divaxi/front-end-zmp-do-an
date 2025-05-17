import { QRCodeCanvas } from "qrcode.react";
import { FC } from "react";

export const QrCodeDisplay: FC<{
  value: string;
  logoSrc?: string;
  logoSize?: number;
  size?: number;
}> = ({ value, logoSrc, logoSize = 40, size = 250 }) => {
  return (
    <div className="flex justify-center items-center w-full relative">
      <QRCodeCanvas
        value={value}
        size={size}
        fgColor="#000000"
        bgColor="#ffffff" // Màu nền của QR code
        level="L" // Mức độ sửa lỗi (L, M, Q, H)
        includeMargin={true}
      />
      {logoSrc && (
        <img
          src={logoSrc}
          alt="Bookie"
          crossOrigin="anonymous"
          className="absolute"
          style={{
            width: logoSize,
            height: logoSize,
            objectFit: "contain",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)", // Đặt logo vào trung tâm QR code
          }}
        />
      )}
    </div>
  );
};
