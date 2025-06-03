import { getPhoneNumber } from "zmp-sdk/apis";
import { AuthService, OpenAPI } from "../api";

export const loginWithZalo = async () => {
  const tokenPhone = await getPhoneNumber({});
  const authenticateUser = await AuthService.authControllerLoginV1({
    requestBody: {
      zaloAccessToken: tokenPhone.number || "0000000001",
    },
  });
  OpenAPI.TOKEN = authenticateUser.token;
  OpenAPI.REFRESH_TOKEN = authenticateUser.refreshToken;
  return authenticateUser;
};

export const refreshToken = async () => {
  const tokenRes = await AuthService.authControllerRefreshV1();
  return tokenRes;
};

export const logout = async () => {
  await AuthService.authControllerLogoutV1();
  OpenAPI.TOKEN = undefined;
  OpenAPI.REFRESH_TOKEN = undefined;
};
