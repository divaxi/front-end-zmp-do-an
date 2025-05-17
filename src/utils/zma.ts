import { followOA } from "zmp-sdk/apis";
import { app } from "@/../app-phongkham-config.json";

export function getBasePath() {
  const urlParams = new URLSearchParams(window.location.search);
  const appEnv = urlParams.get("env");

  if (
    import.meta.env.PROD ||
    appEnv === "TESTING_LOCAL" ||
    appEnv === "TESTING" ||
    appEnv === "DEVELOPMENT"
  ) {
    return `/zapps/${window.APP_ID}`;
  }

  return window.BASE_PATH || "";
}

export const followOfficalAccount = async () => {
  try {
    await followOA({
      id: app.zaloOAId,
    });
  } catch (error) {
    // xử lý khi gọi api thất bại
    console.log(error);
  }
};
