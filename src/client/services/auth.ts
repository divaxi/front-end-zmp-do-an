import { getPhoneNumber } from "zmp-sdk/apis";
import { AuthService, OpenAPI, StaffsService } from "../api";
import { RoleEnum } from "@/utils/enum";

export const loginWithZalo = async () => {
  const tokenPhone = await getPhoneNumber({});
  const authenticateUser = await AuthService.authControllerLoginV1({
    requestBody: {
      zaloAccessToken: tokenPhone.number || "0000000002",
    },
  });
  OpenAPI.TOKEN = authenticateUser.token;
  OpenAPI.REFRESH_TOKEN = authenticateUser.refreshToken;
  if (
    authenticateUser.user.role.id === RoleEnum.staff ||
    authenticateUser.user.role.id === RoleEnum.admin
  ) {
    const staff = await StaffsService.staffsControllerFindByUserV1({
      id: authenticateUser.user.id,
    });
    return {
      auth: authenticateUser,
      staff: staff,
    };
  }
  return {
    auth: authenticateUser,
    staff: undefined,
  };
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
