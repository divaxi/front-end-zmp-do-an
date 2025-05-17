import { useLocation, useNavigate } from "react-router-dom";
import headerLogoImage from "@/static/bookie-logo.svg";
import { useMemo } from "react";
import { useRouteHandle } from "@/hooks";
import { ArrowBackIOSIcon } from "@/components/vectors";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [handle] = useRouteHandle();

  const title = useMemo(() => {
    if (handle) {
      if (typeof handle.title === "function") {
        // return handle.title({ categories, params: match.params });
        return;
      } else {
        return handle.title;
      }
    }
  }, [handle]);

  const showBack = location.key !== "default" && handle?.back !== false;

  if (handle?.logo) {
    return (
      <div className="h-14 w-full flex items-center justify-between px-4 py-2 mt-[var(--zaui-safe-area-inset-top)]">
        <div className="flex items-center space-x-2">
          <img src={headerLogoImage} className="max-h-full flex-none " />
          <p className="text-sm font-medium flex flex-col justify-center">
            <span>Chào mừng</span>
            <span className="text-gray-500">Chào mừng</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-12 w-full flex items-center pl-2 pr-[106px] py-2 space-x-1 mt-[var(--zaui-safe-area-inset-top)]">
      {showBack && (
        <div className="p-2 cursor-pointer" onClick={() => navigate(-1)}>
          <ArrowBackIOSIcon />
        </div>
      )}
      <div className="text-xl font-medium truncate">{title}</div>
    </div>
  );
}
